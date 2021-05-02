package com.alfa.bidit.repository;

import com.alfa.bidit.model.AuctionExpirationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AuctionExpirationRecordRepository extends JpaRepository<AuctionExpirationRecord, Long> {
    List<AuctionExpirationRecord> findAuctionExpirationRecordsByExpirationTimeBefore(Date date);

    AuctionExpirationRecord findAuctionExpirationRecordsByAuctionID(Long auctionID);
}
