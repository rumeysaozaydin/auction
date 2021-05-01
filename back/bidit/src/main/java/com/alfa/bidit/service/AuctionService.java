package com.alfa.bidit.service;


import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.User;
import com.alfa.bidit.utils.Constants;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;


@Service
public interface AuctionService{

    Auction create(Auction auction, Long duration);

    Auction getById(Long id);

    List<Auction> getBySellerId(Long sellerID, Constants.AuctionSorting sort);

    List<Auction> getBySellerIdAndStatus(Long sellerID, List<Constants.AuctionStatus> statusList, Constants.AuctionSorting sort);

    List<Auction> getAll(Constants.AuctionSorting sort);

    List<Auction> getAllByStatus(List<Constants.AuctionStatus> statusList, Constants.AuctionSorting sort);

    List<Auction> getAllByIdIn(List<Long> ids, Constants.AuctionSorting sort);

    List<Auction> getAllByBidOwner(Long bidOwner, Constants.AuctionSorting sort);

    List<Auction> getAllWonByBidOwner(Long bidOwner, Constants.AuctionSorting sort);

    List<Auction> getAllByCategoryIn(List<Constants.AuctionCategory> auctionCategory);

    Boolean isActiveById(Long auctionID);

    Boolean existsById(Long auctionID);

    void endAuctionById(Long id);

    Double getHighestBid(Long id);

    void updateHighestBid(Long auctionID, Double newHighestBid, Long bidOwner);

    Long getSellerIDByAuctionID(Long auctionID);

    List<Auction> getAuctionsByTitleSearch(String titleName);

    void createTransferTransaction(Long sellerID, Long buyerID, Auction auction);

    void approveDelivery(Long id);

    void deleteById(Long id);
}