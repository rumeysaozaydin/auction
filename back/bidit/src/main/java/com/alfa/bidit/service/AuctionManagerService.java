package com.alfa.bidit.service;

import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public interface AuctionManagerService {
    void periodicAuctionExpirationJob();

    void pushExpirationQueue(Long auctionID, Date expirationTime);

    void expireAuctionImmediately(Long auctionID);
}
