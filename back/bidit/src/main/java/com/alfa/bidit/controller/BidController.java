package com.alfa.bidit.controller;

import com.alfa.bidit.model.Bid;
import com.alfa.bidit.service.BidService;
import com.alfa.bidit.utils.ApiPaths;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Boolean> getAllBids(@PathVariable("auction_id") Long auctionID, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(true);
    }

    @PostMapping("/bid")
    public ResponseEntity<Boolean> bid(@PathVariable("auction_id") Long auctionID, @RequestBody Bid bid, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(true);
    }

}
