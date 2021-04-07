package com.alfa.bidit.controller;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.impl.UserServiceImpl;
import com.alfa.bidit.utils.ApiPaths;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ApiPaths.AuctionControllerPath.auction)
@Api(value = ApiPaths.AuctionControllerPath.auction)
public class AuctionController {
    private final AuctionService auctionService;

    @Autowired
    public AuctionController(AuctionService auctionService){
        this.auctionService=auctionService;
    }

    @PostMapping
    public ResponseEntity<Auction> create(@RequestBody Auction auction, @RequestHeader("Authorization") String token){
        // TODO service return type might also be (id(long), auction(DTO), auction(model), success(boolean))
        Auction newAuction = auctionService.create(auction);
        return ResponseEntity.ok(newAuction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> getById(@PathVariable("id") Long id, @RequestHeader("Authorization") String token) {
        try {
            Auction auction = auctionService.getById(id);
            return ResponseEntity.ok(auction);
        }
        catch (AuctionNotExistException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @GetMapping("/seller/{seller_id}")
    public ResponseEntity<List<Auction>> getBySellerId(@PathVariable("seller_id") Long sellerID, @RequestHeader("Authorization") String token){
        try {
            List<Auction> auctions = auctionService.getBySellerId(sellerID);
            return ResponseEntity.ok(auctions);
        }
        catch (UserNotExistException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }
}
