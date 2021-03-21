package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.repository.AuctionRepository;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRepository auctionRepository;
    private final UserService userService;

    @Autowired
    public AuctionServiceImpl(AuctionRepository auctionRepository, UserService userService) {
        this.auctionRepository = auctionRepository;
        this.userService = userService;
    }

    @Override
    public Auction create(Auction auction) {
        auctionRepository.save(auction);
        return auction;
    }

    @Override
    public Auction getById(Long id) {
        Optional<Auction> auction = auctionRepository.findAuctionById(id);

        if (auction.isEmpty()) throw new AuctionNotExistException();

        return auction.get();
    }

    @Override
    public List<Auction> getBySellerId(Long sellerID) {
        if(!userService.existsById(sellerID)) throw new UserNotExistException();

        Optional<List<Auction>> auctions = auctionRepository.findAllBySellerID(sellerID);

        return auctions.orElse(List.of());
    }

}