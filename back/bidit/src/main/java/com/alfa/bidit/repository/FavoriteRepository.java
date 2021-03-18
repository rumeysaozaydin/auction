package com.alfa.bidit.repository;

import com.alfa.bidit.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<List<Favorite>> findFavoritesByUserID(Long userID);

    Optional<Long> countAllByAuctionID(Long auctionID);

    Optional<Favorite> findFavoriteByUserIDAndAuctionID(Long userID, Long auctionID);

    // Should it be optional?
    Boolean existsFavoriteByUserIDAndAuctionID(Long userID, Long auctionID);

    Long deleteFavoriteById(Long id);

    Long deleteFavoriteByUserIDAndAuctionID(Long userID, Long auctionID);

}
