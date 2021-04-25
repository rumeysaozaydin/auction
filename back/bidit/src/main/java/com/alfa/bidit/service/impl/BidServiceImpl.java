package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.*;
import com.alfa.bidit.model.Bid;
import com.alfa.bidit.repository.BidRepository;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.BidService;
import com.alfa.bidit.service.NotificationService;
import com.alfa.bidit.service.UserService;
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

    @Autowired
    public BidServiceImpl(BidRepository bidRepository, AuctionService auctionService, UserService userService, NotificationService notificationService) {
        this.bidRepository = bidRepository;
        this.auctionService = auctionService;
        this.userService = userService;
        this.notificationService = notificationService;
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
        if (!auctionService.existsById(bid.getAuctionID())) throw new AuctionNotExistException();

        if (!userService.existsById(bid.getUserID())) throw new UserNotExistException();

        if (auctionService.getSellerIDByAuctionID(bid.getAuctionID()).equals(bid.getUserID())) throw new BidOwnerNotValidException();

        if (!isBidPriceValid(bid)) throw new BidPriceNotValidException();

        if(!auctionService.isActiveById(bid.getAuctionID())) throw new AuctionNotActiveException();

        auctionService.updateHighestBid(bid.getAuctionID(), bid.getPrice(), bid.getUserID());

        auctionService.getSellerIDByAuctionID(bid.getAuctionID());

        // Inform the seller
        informSeller(bid);

        // Inform the attendees
        informAttendees(bid);

        bidRepository.save(bid);

        return bid.getId();
    }

    public void informSeller(Bid bid) throws PushClientException, InterruptedException {
        notificationService.sendNotification(auctionService.getSellerIDByAuctionID(bid.getAuctionID()), "Bir yeni bidiniz var!", "Yeni bid: $" + bid.getPrice());
    }

    public void informAttendees(Bid bid) throws PushClientException, InterruptedException {
        List<Long> userIDs = getAllByAuctionID(bid.getAuctionID())
                                .stream()
                                .map(Bid::getUserID)
                                .distinct()
                                .filter(userID -> !userID.equals(bid.getUserID()))
                                .collect(Collectors.toList());
        System.out.println("Notify edilecek user lar " + userIDs);
        notificationService.sendNotification(userIDs, "Kötü haber", "Bidiniz geçildi! Yeni bid: $" + bid.getPrice());
    }

    @Override
    public Bid getWinnerBid(Long auctionID) {
        Bid bid =  bidRepository.findFirstByAuctionIDOrderByPriceDesc(auctionID);

        if (bid == null) throw new AuctionWinnerNotExistException();

        return bid;
    }
}
