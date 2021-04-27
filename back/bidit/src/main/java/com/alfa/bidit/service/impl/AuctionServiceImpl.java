package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.AuctionWinnerNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.Bid;
import com.alfa.bidit.repository.AuctionRepository;
import com.alfa.bidit.service.*;
import com.alfa.bidit.utils.Constants.AuctionStatus;
import io.github.jav.exposerversdk.PushClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.alfa.bidit.utils.DateUtil.*;

@Service
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRepository auctionRepository;
    private final UserService userService;
    private final AuctionManagerService auctionManagerService;
    private final BidService bidService;
    private final NotificationService notificationService;

    @Autowired
    public AuctionServiceImpl(AuctionRepository auctionRepository, UserService userService, AuctionManagerService auctionManagerService, @Lazy BidService bidService, NotificationService notificationService) {
        this.auctionRepository = auctionRepository;
        this.userService = userService;
        this.auctionManagerService = auctionManagerService;
        this.bidService = bidService;
        this.notificationService = notificationService;
    }

    @Override
    public Auction create(Auction auction, Long duration) {
        if(!userService.existsById(auction.getSellerID())) throw new UserNotExistException();

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

        if (auction.isEmpty()) throw new AuctionNotExistException();

        return auction.get();
    }

    @Override
    public List<Auction> getBySellerId(Long sellerID) {
        if(!userService.existsById(sellerID)) throw new UserNotExistException();

        Optional<List<Auction>> auctions = auctionRepository.findAllBySellerID(sellerID);

        return auctions.orElse(List.of());
    }

    @Override
    public List<Auction> getBySellerIdAndStatus(Long sellerID, List<AuctionStatus> statusList) {
        if(!userService.existsById(sellerID)) throw new UserNotExistException();

        return auctionRepository.findAllBySellerIDAndStatusIn(sellerID, statusList);
    }

    @Override
    public List<Auction> getAll() {
        return auctionRepository.findAll();
    }

    @Override
    public List<Auction> getAllByStatus(List<AuctionStatus> statusList) {
        return auctionRepository.findAllByStatusIn(statusList);
    }

    @Override
    public List<Auction> getAllByIdIn(List<Long> ids) {
        return auctionRepository.findAllByIdIn(ids);
    }

    @Override
    public List<Auction> getAllByBidOwner(Long bidOwner) {
        return getAllByIdIn(
                bidService
                    .getAllByUserID(bidOwner)
                    .stream()
                    .map(Bid::getAuctionID)
                    .distinct()
                    .collect(Collectors.toList()));
    }

    @Override
    public List<Auction> getAllWonByBidOwner(Long bidOwner) {
        return auctionRepository.findAllByHighestBidOwnerAndStatusIn(bidOwner, List.of(AuctionStatus.EXPIRED_SOLD));
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
                System.out.println("Auction " + auction.getId() + " has been successfully expired. Winner is " + winner);
                sold = true;
            }
            catch (AuctionWinnerNotExistException ex){
                auction.setStatus(AuctionStatus.EXPIRED_UNSOLD);
                System.out.println("Auction " + auction.getId() + " has been successfully expired. No winner! ");
                sold = false;
            }

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
        return auctionRepository.findByTitleContains(titleName);
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
        String description = auction.getTitle() + " başlıklı ilanınız alıcısını buldu! Verilen en yüksek teklif: $" + auction.getHighestBid();

        if(!sold){
            title = "İlanınızın süresi doldu!";
            description = auction.getTitle() + " başlıklı ilanınız hiç teklif almadı.";
        }

        notificationService.sendNotification(auction.getSellerID(), title, description);
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

    private void informLosersOnExpiration(Auction auction, List<Long> losers) throws PushClientException, InterruptedException {
        String title = "1 Yeni Kötü Haberiniz Var :(";
        String description = auction.getTitle() + " başlıklı ilan $" + auction.getHighestBid() + " değerindeki başka bir teklifle son buldu.";
        notificationService.sendNotification(losers, title, description);
    }

    private void informWinnerOnExpiration(Auction auction) throws PushClientException, InterruptedException {
        String title = "1 Yeni Müjdeniz Var!";
        String description = auction.getTitle() + " başlıklı ilanı, verdiğiniz $" + auction.getHighestBid() + " teklifiyle kazandınız. İyi günlerde kullanın :)" ;
        notificationService.sendNotification(auction.getHighestBidOwner(), title, description);
    }


}