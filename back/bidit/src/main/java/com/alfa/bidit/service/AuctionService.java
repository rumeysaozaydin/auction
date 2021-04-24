package com.alfa.bidit.service;


import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.User;
import com.alfa.bidit.utils.Constants;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;


@Service
public interface AuctionService{

    Auction create(Auction auction, Long duration);

    Auction getById(Long id);

    List<Auction> getBySellerId(Long sellerID);

    List<Auction> getBySellerIdAndStatus(Long sellerID, List<Constants.AuctionStatus> statusList);

    List<Auction> getAll();

    List<Auction> getAllByIdIn(List<Long> ids);

    List<Auction> getAllByBidOwner(Long bidOwner);

    List<Auction> getAllWonByBidOwner(Long bidOwner);

    Boolean existsById(Long auctionID);

    void endAuctionById(Long id);

    Double getHighestBid(Long id);

    void updateHighestBid(Long auctionID, Double newHighestBid, Long bidOwner);

    Long getSellerIDByAuctionID(Long auctionID);
}