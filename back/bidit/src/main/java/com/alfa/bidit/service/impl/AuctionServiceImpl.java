package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.AuctionWinnerNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.Bid;
import com.alfa.bidit.repository.AuctionRepository;
import com.alfa.bidit.service.AuctionManagerService;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.BidService;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.utils.Constants.AuctionStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.alfa.bidit.utils.DateUtil.*;

@Service
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRepository auctionRepository;
    private final UserService userService;
    private final AuctionManagerService auctionManagerService;
    private final BidService bidService;

    @Autowired
    public AuctionServiceImpl(AuctionRepository auctionRepository, UserService userService, AuctionManagerService auctionManagerService,@Lazy BidService bidService) {
        this.auctionRepository = auctionRepository;
        this.userService = userService;
        this.auctionManagerService = auctionManagerService;
        this.bidService = bidService;
    }

    @Override
    public Auction create(Auction auction, Long duration) {
        if(!userService.existsById(auction.getSellerID())) throw new UserNotExistException();

        setStartingAndExpirationTime(auction, duration);
        auction.setHighestBid(auction.getInitialPrice());
        auction.setStatus(AuctionStatus.ACTIVE);

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
    public List<Auction> getBySellerIdAndStatus(Long sellerID, List<AuctionStatus> statusList) {
        if(!userService.existsById(sellerID)) throw new UserNotExistException();

        return auctionRepository.findAllBySellerIDAndStatusIn(sellerID, statusList);
    }

    @Override
    public List<Auction> getAll() {
        return auctionRepository.findAll();
    }

    @Override
    public List<Auction> getAllByIdIn(List<Long> ids) {
        return auctionRepository.findAllByIdIn(ids);
    }

    @Override
    public List<Auction> getAllByBidOwner(Long bidOwner) {
        return getAllByIdIn(
                bidService
                    .getAllByUserID(bidOwner)
                    .stream()
                    .map(Bid::getAuctionID)
                    .distinct()
                    .collect(Collectors.toList()));
    }

    @Override
    public List<Auction> getAllWonByBidOwner(Long bidOwner) {
        return auctionRepository.findAllByHighestBidOwnerAndStatusIn(bidOwner, List.of(AuctionStatus.EXPIRED_SOLD));
    }

    @Override
    public Boolean existsById(Long auctionID) {
        return auctionRepository.existsAuctionById(auctionID);
    }

    @Override
    public void endAuctionById(Long id) {
        auctionRepository.findAuctionById(id).ifPresent(auction -> {

            try {
                Bid winner = bidService.getWinnerBid(id);
                auction.setStatus(AuctionStatus.EXPIRED_SOLD);
                System.out.println("Auction " + auction.getId() + " has been successfully expired. Winner is " + winner);
            }
            catch (AuctionWinnerNotExistException ex){
                auction.setStatus(AuctionStatus.EXPIRED_UNSOLD);
                System.out.println("Auction " + auction.getId() + " has been successfully expired. No winner! ");
            }

            // TODO Probably notify the seller and all the attendees here.

            auctionRepository.save(auction);
        });
    }

    @Override
    public Double getHighestBid(Long id) {
        return getById(id).getHighestBid();
    }

    @Override
    public void updateHighestBid(Long auctionID, Double newHighestBid, Long bidOwner) {
        Auction auction = getById(auctionID);
        auction.setHighestBid(newHighestBid);
        auction.setHighestBidOwner(bidOwner);
        auctionRepository.save(auction);
    }

    @Override
    public Long getSellerIDByAuctionID(Long auctionID) {
        return getById(auctionID).getSellerID();
    }

    // === PRIVATE METHODS ===

    private void setStartingAndExpirationTime(Auction auction, Long duration){
        Date startingTime = now();
        Date expirationTime = plusSeconds(startingTime, duration);

        auction.setStartingTime(startingTime);
        auction.setExpirationTime(expirationTime);
    }

}