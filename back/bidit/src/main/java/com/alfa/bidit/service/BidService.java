package com.alfa.bidit.service;

import com.alfa.bidit.model.Bid;
import io.github.jav.exposerversdk.PushClientException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BidService {
    List<Bid> getAllByAuctionID(Long auctionID);

    List<Bid> getAllByUserID(Long userID);

    Long bid(Bid bid) throws PushClientException, InterruptedException;

    Bid getWinnerBid(Long auctionID);
}
