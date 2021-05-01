package com.alfa.bidit.controller;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.FavoriteAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.Favorite;
import com.alfa.bidit.service.FavoriteService;
import com.alfa.bidit.utils.ApiPaths;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.FavoriteControllerPath.favorite)
@Api(value = ApiPaths.FavoriteControllerPath.favorite)
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<Long> add(@RequestBody Favorite favorite, @RequestHeader("Authorization") String token){
        Long id = favoriteService.add(favorite);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<List<Auction>> getAllFavoritesByUserId(@PathVariable("user_id") Long userID, @RequestHeader("Authorization") String token){
        List<Auction> favorites = favoriteService.getFavoriteAuctionsByUserID(userID);
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/{favorite_id}")
    public ResponseEntity<Long> deleteById(@PathVariable("favorite_id") Long id, @RequestHeader("Authorization") String token){
        Long rows_affected = favoriteService.deleteById(id);

        if (rows_affected == 0) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return ResponseEntity.ok(rows_affected);
    }

    @DeleteMapping("/{user_id}/{auction_id}")
    public ResponseEntity<Long> deleteByUserIDAndAuctionID(@PathVariable("user_id") Long userID, @PathVariable("auction_id") Long auctionID, @RequestHeader("Authorization") String token){
        Long rows_affected = favoriteService.deleteByUserIDAndAuctionID(userID, auctionID);

        if (rows_affected == 0) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return ResponseEntity.ok(rows_affected);
    }
}
