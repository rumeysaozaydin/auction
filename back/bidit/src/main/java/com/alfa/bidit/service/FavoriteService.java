package com.alfa.bidit.service;

import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.Favorite;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavoriteService {
    Long add(Favorite favorite);

    List<Favorite> getAllByUserID(Long id);

    Long deleteById(Long id);

    Long deleteByUserIDAndAuctionID(Long userID, Long auctionID);

    List<Auction> getFavoriteAuctionsByUserID(Long id);
}
