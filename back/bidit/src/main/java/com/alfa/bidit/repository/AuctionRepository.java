package com.alfa.bidit.repository;

import com.alfa.bidit.model.Auction;
import com.alfa.bidit.utils.Constants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long>{

    Boolean existsAuctionById(Long id);

    Optional<Auction> findAuctionById(Long id);

    Optional<List<Auction>> findAllBySellerID(Long sellerID);

    List<Auction> findAllByIdIn(List<Long> ids);

    List<Auction> findAllBySellerIDAndStatusIn(Long sellerID, List<Constants.AuctionStatus> statusList);

    List<Auction> findAllByHighestBidOwnerAndStatusIn(Long highestBidOwner, List<Constants.AuctionStatus> statusList);

    List<Auction> findAllByStatusIn(List<Constants.AuctionStatus> statusList);

    List<Auction> findByTitleContains(String titleContains);

    //List<Auction> findAllByAuctionCategoryEquals(Constants.AuctionCategory auctionCategory);

    List<Auction> findAllByAuctionCategoryIn(List<Constants.AuctionCategory> auctionCategory);



    List<Auction> findByTitle(String title);


    @Transactional
    @Query(
            value = "SELECT * FROM auctions u WHERE LOWER (u.title) LIKE LOWER (%:auctionName% )",
            nativeQuery = true)
    List<Auction> findSpecificNameAuction(@Param("auctionName") String auctionName);


}