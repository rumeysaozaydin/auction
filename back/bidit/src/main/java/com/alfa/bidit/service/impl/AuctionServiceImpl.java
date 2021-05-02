package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.AuctionWinnerNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.Bid;
import com.alfa.bidit.repository.AuctionRepository;

import com.alfa.bidit.service.AuctionManagerService;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.BidService;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.utils.Constants;
import com.alfa.bidit.service.*;
import com.alfa.bidit.utils.Constants.AuctionStatus;
import io.github.jav.exposerversdk.PushClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.alfa.bidit.utils.DateUtil.*;

@Service
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRepository auctionRepository;
    private final UserService userService;
    private final AuctionManagerService auctionManagerService;
    private final BidService bidService;
    private final NotificationService notificationService;
    private final TransactionService transactionService;

    private Map<Constants.AuctionSorting, Sort> sortingMapping;

    @Autowired
    public AuctionServiceImpl(AuctionRepository auctionRepository, UserService userService, AuctionManagerService auctionManagerService, @Lazy BidService bidService, NotificationService notificationService, TransactionService transactionService) {
        this.auctionRepository = auctionRepository;
        this.userService = userService;
        this.auctionManagerService = auctionManagerService;
        this.bidService = bidService;
        this.notificationService = notificationService;
        this.transactionService = transactionService;

        buildSortMapping();
    }

    @Override
    public Auction create(Auction auction, Long duration) {
        if(!userService.existsById(auction.getSellerID())) throw new UserNotExistException("Kullanıcı mevcut değil.");

        setStartingAndExpirationTime(auction, duration);
        auction.setHighestBid(auction.getInitialPrice());
        auction.setStatus(AuctionStatus.ACTIVE);

        auctionRepository.save(auction);
        auctionManagerService.pushExpirationQueue(auction.getId(), auction.getExpirationTime());
        return auction;
    }

    @Override
    public Auction getById(Long id) {
        Optional<Auction> auction = auctionRepository.findAuctionById(id);

        if (auction.isEmpty()) throw new AuctionNotExistException("İlan mevcut değil.");;

        return auction.get();
    }

    @Override
    public List<Auction> getBySellerId(Long sellerID, Constants.AuctionSorting sort) {
        if(!userService.existsById(sellerID)) throw new UserNotExistException("Kullanıcı mevcut değil.");

        Optional<List<Auction>> auctions = auctionRepository.findAllBySellerID(sellerID, getSort(sort));

        return auctions.orElse(List.of());
    }

    @Override
    public List<Auction> getBySellerIdAndStatus(Long sellerID, List<AuctionStatus> statusList, Constants.AuctionSorting sort) {
        if(!userService.existsById(sellerID)) throw new UserNotExistException("Kullanıcı mevcut değil.");

        return auctionRepository.findAllBySellerIDAndStatusIn(sellerID, statusList, getSort(sort));
    }

    @Override
    public List<Auction> getAll(Constants.AuctionSorting sort) {
        return auctionRepository.findAll(getSort(sort));
    }

    @Override
    public List<Auction> getAllByStatus(List<AuctionStatus> statusList, Constants.AuctionSorting sort) {
        return auctionRepository.findAllByStatusIn(statusList, getSort(sort));
    }

    @Override
    public List<Auction> getAllByIdIn(List<Long> ids, Constants.AuctionSorting sort) {
        return auctionRepository.findAllByIdIn(ids, getSort(sort));
    }

    @Override
    public List<Auction> getAllByBidOwner(Long bidOwner, Constants.AuctionSorting sort) {
        return getAllByIdIn(
                bidService
                    .getAllByUserID(bidOwner)
                    .stream()
                    .map(Bid::getAuctionID)
                    .distinct()
                    .collect(Collectors.toList()), sort);
    }

    @Override
    public List<Auction> getAllWonByBidOwner(Long bidOwner, Constants.AuctionSorting sort) {
        return auctionRepository.findAllByHighestBidOwnerAndStatusIn(bidOwner, List.of(AuctionStatus.EXPIRED_SOLD), getSort(sort));
    }

    @Override
    public Boolean isActiveById(Long auctionID) {
        Auction auction = getById(auctionID);
        return auction.getStatus().equals(AuctionStatus.ACTIVE);
    }

    @Override
    public Boolean existsById(Long auctionID) {
        return auctionRepository.existsAuctionById(auctionID);
    }

    @Override
    public void endAuctionById(Long id){
        auctionRepository.findAuctionById(id).ifPresent(auction -> {

            boolean sold;
            try {
                Bid winner = bidService.getWinnerBid(id);
                auction.setStatus(AuctionStatus.EXPIRED_SOLD);
                createTransferTransaction(auction.getSellerID(), winner.getUserID(), auction);
                System.out.println("Auction " + auction.getId() + " has been successfully expired. Winner is " + winner);
                sold = true;
            }
            catch (AuctionWinnerNotExistException ex){
                auction.setStatus(AuctionStatus.EXPIRED_UNSOLD);
                System.out.println("Auction " + auction.getId() + " has been successfully expired. No winner! ");
                sold = false;
            }

            auction.setExpirationTime(now()); // For immediate expiration

            auctionRepository.save(auction);

            try {
                // Inform the seller
                informSellerOnExpiration(sold, auction);

                // Inform attendees
                if(sold) {
                    informAttendeesOnExpiration(auction);
                }
            } catch (Exception e) {
                System.out.println("ERROR while sending user push notification on auction expiration.");
                e.printStackTrace();
            }
        });
    }



    @Override
    public Double getHighestBid(Long id) {
        return getById(id).getHighestBid();
    }

    @Override
    public void updateHighestBid(Long auctionID, Double newHighestBid, Long bidOwner) {
        Auction auction = getById(auctionID);
        auction.setHighestBid(newHighestBid);
        auction.setHighestBidOwner(bidOwner);
        auctionRepository.save(auction);
    }

    @Override
    public Long getSellerIDByAuctionID(Long auctionID) {
        return getById(auctionID).getSellerID();
    }

    @Override
    public List<Auction> getAuctionsByTitleSearch(String titleName) {
        //return auctionRepository.findSpecificNameAuction(titleName);
        String[] tokens = titleName.split(" ");

        System.out.println(Arrays.toString(tokens));

        List<Auction> auctions = new ArrayList<>();

        for (String t : tokens) {

          //  auctions.addAll(auctionRepository.findByTitleContains(t.toLowerCase()));
          //  auctions.addAll(auctionRepository.findByDescriptionContains(t.toLowerCase()));

            if(!t.isEmpty()) {
                auctions.addAll(auctionRepository.findByTitleContainingIgnoreCase(t.toLowerCase()));
                auctions.addAll(auctionRepository.findByDescriptionContainingIgnoreCase(t.toLowerCase()));
            }
        }

        List<Auction> auctionList = auctions.stream()
                .distinct()
                .collect(Collectors.toList());



        return  auctionList;
    }

    @Override
    public void createTransferTransaction(Long sellerID, Long buyerID, Auction auction) {
        Long transactionID = transactionService.createTransfer(buyerID, sellerID, auction.getHighestBid());
        auction.setTransactionID(transactionID);
        auctionRepository.save(auction);
    }

    @Override
    public void approveDelivery(Long id) {
        Auction auction = getById(id);
        transactionService.approveTransaction(auction.getTransactionID());
    }

    @Override
    public void deleteById(Long id) {
        auctionRepository.deleteById(id);
    }

    // === PRIVATE METHODS ===

    private void setStartingAndExpirationTime(Auction auction, Long duration){
        Date startingTime = now();
        Date expirationTime = plusSeconds(startingTime, duration);

        auction.setStartingTime(startingTime);
        auction.setExpirationTime(expirationTime);
    }

    private void informSellerOnExpiration(boolean sold, Auction auction) throws PushClientException, InterruptedException {
        String title = "1 Yeni Müjdeniz Var!"; // TODO Yaratıcı arkadaşları buraya bekliyorum.
        String description = auction.getTitle() + " başlıklı ilanınız alıcısını buldu! Verilen en yüksek teklif: " + auction.getHighestBid() + "₺";

        if(!sold){
            title = "İlanınızın süresi doldu!";
            description = auction.getTitle() + " başlıklı ilanınız hiç teklif almadı.";
        }

        notificationService.sendPushNotification(auction.getSellerID(), title, description);
        notificationService.saveInAppNotification(auction.getSellerID(), title, description);
    }

    private void informAttendeesOnExpiration(Auction auction) throws PushClientException, InterruptedException {
        List<Long> losers = bidService
                                    .getAllByAuctionID(auction.getId())
                                    .stream()
                                    .map(Bid::getUserID)
                                    .distinct()
                                    .filter(id -> !id.equals(auction.getHighestBidOwner()))
                                    .collect(Collectors.toList());

        informLosersOnExpiration(auction, losers);
        informWinnerOnExpiration(auction);
    }


    @Override
    public List<Auction> getAllByCategoryIn(List<Constants.AuctionCategory> auctionCategory) {



      //  return auctionRepository.findAllByAuctionCategoryEquals(auctionCategory);

        return auctionRepository.findAllByAuctionCategoryIn(auctionCategory);

    }

    private void informLosersOnExpiration(Auction auction, List<Long> losers) throws PushClientException, InterruptedException {
        String title = "1 Yeni Kötü Haberiniz Var :(";
        String description = auction.getTitle() + " başlıklı ilan $" + auction.getHighestBid() + " değerindeki başka bir teklifle son buldu.";
        notificationService.sendPushNotification(losers, title, description);
        notificationService.saveInAppNotification(losers, title, description);
    }

    private void informWinnerOnExpiration(Auction auction) throws PushClientException, InterruptedException {
        String title = "1 Yeni Müjdeniz Var!";
        String description = auction.getTitle() + " başlıklı ilanı, verdiğiniz " + auction.getHighestBid() + "₺ teklifiyle kazandınız. İyi günlerde kullanın :)" ;
        notificationService.sendPushNotification(auction.getHighestBidOwner(), title, description);
        notificationService.saveInAppNotification(auction.getHighestBidOwner(), title, description);
    }

    private void buildSortMapping(){
        sortingMapping = new HashMap<>();
        sortingMapping.put(Constants.AuctionSorting.UNSORTED, Sort.unsorted());
        sortingMapping.put(Constants.AuctionSorting.BY_EXPIRATION_TIME_ASC, Sort.by(Sort.Direction.ASC, "expirationTime"));
        sortingMapping.put(Constants.AuctionSorting.BY_EXPIRATION_TIME_DESC, Sort.by(Sort.Direction.DESC, "expirationTime"));
        sortingMapping.put(Constants.AuctionSorting.BY_STARTING_TIME_ASC, Sort.by(Sort.Direction.ASC, "startingTime"));
        sortingMapping.put(Constants.AuctionSorting.BY_STARTING_TIME_DESC, Sort.by(Sort.Direction.DESC, "startingTime"));
        sortingMapping.put(Constants.AuctionSorting.BY_PRICE_ASC, Sort.by(Sort.Direction.ASC, "highestBid"));
        sortingMapping.put(Constants.AuctionSorting.BY_PRICE_DESC, Sort.by(Sort.Direction.DESC, "highestBid"));
    }

    private Sort getSort(Constants.AuctionSorting sortingKey){
        if(sortingKey == null)
            return sortingMapping.get(Constants.AuctionSorting.UNSORTED);

        return this.sortingMapping.get(sortingKey);
    }

}