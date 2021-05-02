package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.FavoriteAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.Favorite;
import com.alfa.bidit.repository.AuctionRepository;
import com.alfa.bidit.repository.FavoriteRepository;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.FavoriteService;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserService userService;
    private final AuctionService auctionService;

    @Autowired
    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, UserRepository userRepository, AuctionRepository auctionRepository, UserService userService, AuctionService auctionService) {
        this.favoriteRepository = favoriteRepository;
        this.userService = userService;
        this.auctionService = auctionService;
    }


    @Override
    public Long add(Favorite favorite) {

        if(!userService.existsById(favorite.getUserID())) throw new UserNotExistException("Kullanıcı mevcut değil.");

        if(!auctionService.existsById(favorite.getAuctionID())) throw new AuctionNotExistException("İlan mevcut değil.");

        if(favoriteRepository.existsFavoriteByUserIDAndAuctionID(favorite.getUserID(), favorite.getAuctionID())) throw new FavoriteAlreadyExistsException("Bu ürünü zaten favorilere eklediniz.");

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
    @Transactional
    public Long deleteById(Long id) {
        return favoriteRepository.deleteFavoriteById(id);
    }

    @Override
    @Transactional
    public Long deleteByUserIDAndAuctionID(Long userID, Long auctionID) {
        return favoriteRepository.deleteFavoriteByUserIDAndAuctionID(userID, auctionID);
    }

    @Override
    public List<Auction> getFavoriteAuctionsByUserID(Long id) {
        List<Long> favoriteIDs = getAllByUserID(id).stream().map(Favorite::getAuctionID).collect(Collectors.toList());
        return auctionService.getAllByIdIn(favoriteIDs, Constants.AuctionSorting.UNSORTED);
    }

}
