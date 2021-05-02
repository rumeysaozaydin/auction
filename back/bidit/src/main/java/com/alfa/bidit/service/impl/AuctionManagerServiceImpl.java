package com.alfa.bidit.service.impl;

import com.alfa.bidit.model.AuctionExpirationRecord;
import com.alfa.bidit.repository.AuctionExpirationRecordRepository;
import com.alfa.bidit.service.AuctionManagerService;
import com.alfa.bidit.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuctionManagerServiceImpl implements AuctionManagerService {

    private final AuctionService auctionService;
    private final AuctionExpirationRecordRepository auctionExpirationRecordRepository;

    // I DO NOT KNOW WHY PUTTING @LAZY HAS WORKED. IF YOU REMOVE THAT, IT WILL GIVE
    // YOU CIRCULAR DEPENDENCY ERROR. SO DON'T, FOR NOW.

    @Autowired
    public AuctionManagerServiceImpl(@Lazy AuctionService auctionService, AuctionExpirationRecordRepository auctionExpirationRecordRepository) {
        this.auctionService = auctionService;
        this.auctionExpirationRecordRepository = auctionExpirationRecordRepository;
        // TODO I guess we do not have to call this explicitly.
        //this.periodicAuctionExpirationJob();
    }

    @Scheduled(fixedRate = 5*1000) // in ms
    public void periodicAuctionExpirationJob(){

        Date now = Date.from(Instant.now());
//        System.out.println("[INFO] " + now + " Auction Expiration Job STARTED. ");

        // Get auction records to be expired. (Consisting of auctionID and Ex date)
        List<AuctionExpirationRecord> auctionsToBeExpired =
            auctionExpirationRecordRepository
                .findAuctionExpirationRecordsByExpirationTimeBefore(now);

        // Do actual expiration operation individually.
        auctionsToBeExpired.forEach(record -> auctionService.endAuctionById(record.getAuctionID()));

        // Pop the records out of the queue.
        auctionExpirationRecordRepository.deleteAll(auctionsToBeExpired);

        now = Date.from(Instant.now());
//        System.out.println("[INFO] " + now + " Auction Expiration Job ENDED.");
    }

    @Override
    public void pushExpirationQueue(Long auctionID, Date expirationTime) {
        // TODO add check whether it already exists
        AuctionExpirationRecord record = new AuctionExpirationRecord(auctionID, expirationTime);
        auctionExpirationRecordRepository.save(record);
        System.out.println("[INFO] Auction Expiration Record created for ID: " + auctionID);
    }

    @Override
    public void expireAuctionImmediately(Long auctionID) {
        auctionService.endAuctionById(auctionID);
        AuctionExpirationRecord record = auctionExpirationRecordRepository.findAuctionExpirationRecordsByAuctionID(auctionID);
        if (record != null)
            auctionExpirationRecordRepository.deleteById(record.getId());
    }
}
