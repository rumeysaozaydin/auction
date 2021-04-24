package com.alfa.bidit.repository;

import com.alfa.bidit.model.Bid;
import com.fasterxml.jackson.annotation.OptBoolean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    Optional<List<Bid>> findAllByAuctionID(Long auctionID);

    List<Bid> findAllByUserID(Long userID);

    Bid findFirstByAuctionIDOrderByPriceDesc(Long auctionID);
}
