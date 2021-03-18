package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.FavoriteAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Favorite;
import com.alfa.bidit.repository.AuctionRepository;
import com.alfa.bidit.repository.FavoriteRepository;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final AuctionRepository auctionRepository;

    @Autowired
    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, UserRepository userRepository, AuctionRepository auctionRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.auctionRepository = auctionRepository;
    }


    @Override
    public Long add(Favorite favorite) {

        if(!userRepository.existsUserById(favorite.getUserID())) throw new UserNotExistException();

        if(!auctionRepository.existsAuctionById(favorite.getAuctionID())) throw new AuctionNotExistException();

        if(favoriteRepository.existsFavoriteByUserIDAndAuctionID(favorite.getUserID(), favorite.getAuctionID())) throw new FavoriteAlreadyExistsException(favorite);

        favoriteRepository.save(favorite);

        return favorite.getId();
    }


    @Override
    public List<Favorite> getAllByUserID(Long userID) {
        Optional<List<Favorite>> favorites = favoriteRepository.findFavoritesByUserID(userID);

        if(favorites.isEmpty()) return List.of();

        return favorites.get();
    }

    @Override
    public Long deleteById(Long id) {
        return favoriteRepository.deleteFavoriteById(id);
    }

    @Override
    public Long deleteByUserIDAndAuctionID(Long userID, Long auctionID) {
        return favoriteRepository.deleteFavoriteByUserIDAndAuctionID(userID, auctionID);
    }
}
