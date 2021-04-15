package com.alfa.bidit.repository;

import com.alfa.bidit.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long>{
    Boolean existsAuctionById(Long id);

    Optional<Auction> findAuctionById(Long id);

    Optional<List<Auction>> findAllBySellerID(Long sellerID);

    List<Auction> findAllByIdIn(List<Long> ids);
}