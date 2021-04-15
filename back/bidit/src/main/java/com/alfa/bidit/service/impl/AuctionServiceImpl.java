package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.repository.AuctionRepository;
import com.alfa.bidit.service.AuctionManagerService;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRepository auctionRepository;
    private final UserService userService;
    private final AuctionManagerService auctionManagerService;

    @Autowired
    public AuctionServiceImpl(AuctionRepository auctionRepository, UserService userService, AuctionManagerService auctionManagerService) {
        this.auctionRepository = auctionRepository;
        this.userService = userService;
        this.auctionManagerService = auctionManagerService;
    }

    @Override
    public Auction create(Auction auction) {
        // TODO IT DOES NOT CHECK WHETHER THE SELLER EXIST.
        auctionRepository.save(auction);
        auctionManagerService.pushExpirationQueue(auction.getId(), auction.getExpirationTime());
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

    @Override
    public List<Auction> getAll() {
        return auctionRepository.findAll();
    }

    @Override
    public Boolean existsById(Long auctionID) {
        return auctionRepository.existsAuctionById(auctionID);
    }

    @Override
    public void endAuctionById(Long id) {
        auctionRepository.findAuctionById(id).ifPresent(auction -> {
            auction.setStatus(Constants.AuctionStatus.EXPIRED);
            // TODO Probably notify the seller and all the attendees here.
            System.out.println("Auction " + auction.getId() + " has been successfully expired. ");
            auctionRepository.save(auction);
        });
    }

}