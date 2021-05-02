package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.*;
import com.alfa.bidit.model.Bid;
import com.alfa.bidit.repository.BidRepository;
import com.alfa.bidit.service.*;
import io.github.jav.exposerversdk.PushClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BidServiceImpl implements BidService {
    private final BidRepository bidRepository;
    private final AuctionService auctionService;
    private final UserService userService;
    private final NotificationService notificationService;
    private final WalletService walletService;

    @Autowired
    public BidServiceImpl(BidRepository bidRepository, AuctionService auctionService, UserService userService, NotificationService notificationService, WalletService walletService) {
        this.bidRepository = bidRepository;
        this.auctionService = auctionService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.walletService = walletService;
    }

    @Override
    public List<Bid> getAllByAuctionID(Long auctionID) {
        if(!auctionService.existsById(auctionID)) throw new AuctionNotExistException();

        return bidRepository.findAllByAuctionID(auctionID).orElse(List.of());
    }

    @Override
    public List<Bid> getAllByUserID(Long userID) {
        return bidRepository.findAllByUserID(userID);
    }

    public boolean isBidPriceValid(Bid bid){
        Double highestBid = auctionService.getHighestBid(bid.getAuctionID());

        return bid.getPrice() > highestBid;
    }

    @Override
    public Long bid(Bid bid) throws PushClientException, InterruptedException {

        if (bid.getPrice() == null) throw new BidPriceNotValidException("Lütfen geçerli bir değer giriniz.");

        if (!auctionService.existsById(bid.getAuctionID())) throw new AuctionNotExistException("İlan mevcut değil.");

        if (!userService.existsById(bid.getUserID())) throw new UserNotExistException("Kullanıcı mevcut değil.");

        if (auctionService.getSellerIDByAuctionID(bid.getAuctionID()).equals(bid.getUserID())) throw new BidOwnerNotValidException("Kendinize teklif veremezsiniz.");

        if (!isBidPriceValid(bid)) throw new BidPriceNotValidException("Verilen teklif güncel tekliften az olamaz!");

        if (!auctionService.isActiveById(bid.getAuctionID())) throw new AuctionNotActiveException("İlanın süresi doldu!");;

        if (walletService.getBalance(bid.getUserID()) < bid.getPrice()) throw new InsufficientBalanceException("Bu teklif için bakiyeniz yetersiz.");

        auctionService.updateHighestBid(bid.getAuctionID(), bid.getPrice(), bid.getUserID());

        auctionService.getSellerIDByAuctionID(bid.getAuctionID());

        bidRepository.save(bid);

        // Inform the seller
        informSeller(bid);

        // Inform the attendees
        informAttendees(bid);

        return bid.getId();
    }

    public void informSeller(Bid bid) throws PushClientException, InterruptedException {
        notificationService.sendPushNotification(auctionService.getSellerIDByAuctionID(bid.getAuctionID()), "1 Yeni Teklifiniz Var :)", "Yeni teklif: " + bid.getPrice() + "₺");
        notificationService.saveInAppNotification(auctionService.getSellerIDByAuctionID(bid.getAuctionID()), "1 Yeni Teklifiniz Var :)", "Yeni teklif: " + bid.getPrice() + "₺");
    }

    public void informAttendees(Bid bid) throws PushClientException, InterruptedException {
        List<Long> userIDs = getAllByAuctionID(bid.getAuctionID())
                                .stream()
                                .map(Bid::getUserID)
                                .distinct()
                                .filter(userID -> !userID.equals(bid.getUserID()))
                                .collect(Collectors.toList());
        notificationService.sendPushNotification(userIDs, "1 Yeni Kötü Haberiniz Var :(", "Teklifiniz geçildi! Yeni teklif: $" + bid.getPrice());
        notificationService.saveInAppNotification(userIDs, "1 Yeni Kötü Haberiniz Var :(", "Teklifiniz geçildi! Yeni teklif: $" + bid.getPrice());
    }

    @Override
    public Bid getWinnerBid(Long auctionID) {
        Bid bid =  bidRepository.findFirstByAuctionIDOrderByPriceDesc(auctionID);

        if (bid == null) throw new AuctionWinnerNotExistException("İlanınıza kimse teklif vermedi.");;

        return bid;
    }
}
