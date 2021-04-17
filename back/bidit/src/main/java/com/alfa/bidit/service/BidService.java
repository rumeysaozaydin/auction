package com.alfa.bidit.service;

import com.alfa.bidit.model.Bid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BidService {
    List<Bid> getAllByAuctionID(Long auctionID);

    Long bid(Bid bid);
}
