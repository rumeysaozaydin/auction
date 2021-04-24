package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.*;
import com.alfa.bidit.model.Bid;
import com.alfa.bidit.repository.BidRepository;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.BidService;
import com.alfa.bidit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidServiceImpl implements BidService {
    private final BidRepository bidRepository;
    private final AuctionService auctionService;
    private final UserService userService;

    @Autowired
    public BidServiceImpl(BidRepository bidRepository, AuctionService auctionService, UserService userService) {
        this.bidRepository = bidRepository;
        this.auctionService = auctionService;
        this.userService = userService;
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
    public Long bid(Bid bid) {
        if (!auctionService.existsById(bid.getAuctionID())) throw new AuctionNotExistException();

        if (!userService.existsById(bid.getUserID())) throw new UserNotExistException();

        if (auctionService.getSellerIDByAuctionID(bid.getAuctionID()).equals(bid.getUserID())) throw new BidOwnerNotValidException();

        if (!isBidPriceValid(bid)) throw new BidPriceNotValidException();

        if(!auctionService.isActiveById(bid.getAuctionID())) throw new AuctionNotActiveException();

        auctionService.updateHighestBid(bid.getAuctionID(), bid.getPrice(), bid.getUserID());

        bidRepository.save(bid);

        return bid.getId();
    }

    @Override
    public Bid getWinnerBid(Long auctionID) {
        Bid bid =  bidRepository.findFirstByAuctionIDOrderByPriceDesc(auctionID);

        if (bid == null) throw new AuctionWinnerNotExistException();

        return bid;
    }
}
