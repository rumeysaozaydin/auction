package com.alfa.bidit.controller;

import com.alfa.bidit.exception.*;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.Bid;
import com.alfa.bidit.service.BidService;
import com.alfa.bidit.utils.ApiPaths;
import io.github.jav.exposerversdk.PushClientException;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.BidControllerPath.bid)
@Api(value = ApiPaths.BidControllerPath.bid)
public class BidController {

    private final BidService bidService;

    @Autowired
    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @GetMapping("/bids")
    public ResponseEntity<List<Bid>> getAllBids(@RequestHeader("Authorization") String token, @PathVariable("auction_id") Long auctionID){
        List<Bid> bids = bidService.getAllByAuctionID(auctionID);
        return ResponseEntity.ok(bids);
    }

    @GetMapping("/winner")
    public ResponseEntity<Bid> getWinnerBid(@RequestHeader("Authorization") String token, @PathVariable("auction_id") Long auctionID){
        Bid bid = bidService.getWinnerBid(auctionID);
        return ResponseEntity.ok(bid);
    }

    @PostMapping("/bid")
    public ResponseEntity<Long> bid(@RequestHeader("Authorization") String token, @PathVariable("auction_id") Long auctionID, @RequestBody Bid bid) throws PushClientException, InterruptedException {
        Long bidID = bidService.bid(bid);
        return ResponseEntity.ok(bidID);
    }
}
