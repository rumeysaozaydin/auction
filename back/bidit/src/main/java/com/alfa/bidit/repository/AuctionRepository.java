package com.alfa.bidit.repository;

import com.alfa.bidit.model.Auction;
import com.alfa.bidit.utils.Constants;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long>{

    Boolean existsAuctionById(Long id);

    Optional<Auction> findAuctionById(Long id);

    Optional<List<Auction>> findAllBySellerID(Long sellerID, Sort sort);

    List<Auction> findAllByIdIn(List<Long> ids, Sort sort);

    List<Auction> findAllBySellerIDAndStatusIn(Long sellerID, List<Constants.AuctionStatus> statusList, Sort sort);

    List<Auction> findAllByHighestBidOwnerAndStatusIn(Long highestBidOwner, List<Constants.AuctionStatus> statusList, Sort sort);

    List<Auction> findAllByStatusIn(List<Constants.AuctionStatus> statusList, Sort sort);

    List<Auction> findByTitleContains(String titleContains);

    List<Auction> findByDescriptionContains(String descriptionContains);


    @Query("select e from Auction e where lower(e.title) like %:name%")
    List<Auction> findByTitleContainingIgnoreCase(@Param("name") String name);

    @Query("select e from Auction e where lower(e.description) like %:name%")
    List<Auction> findByDescriptionContainingIgnoreCase(@Param("name") String name);



    //List<Auction> findAllByAuctionCategoryEquals(Constants.AuctionCategory auctionCategory);

    List<Auction> findAllByAuctionCategoryIn(List<Constants.AuctionCategory> auctionCategory);



    List<Auction> findByTitle(String title, Sort sort);


    @Transactional
    @Query(
            value = "SELECT * FROM auctions u WHERE LOWER (u.title) LIKE LOWER (%:auctionName% )",
            nativeQuery = true)
    List<Auction> findSpecificNameAuction(@Param("auctionName") String auctionName);


}