package com.alfa.bidit.controller;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.AuctionImage;
import com.alfa.bidit.service.AuctionImageService;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.ImageService;
import com.alfa.bidit.utils.ApiPaths;
import com.alfa.bidit.utils.Constants.AuctionSorting;
import com.alfa.bidit.utils.Constants;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;



import java.util.List;

@RestController
@RequestMapping(ApiPaths.AuctionControllerPath.auction)
@Api(value = ApiPaths.AuctionControllerPath.auction)
public class AuctionController {
    private final AuctionService auctionService;
    private final ImageService imageService;
    private final AuctionImageService auctionImageService;

    @Autowired
    public AuctionController(AuctionService auctionService, ImageService imageService, AuctionImageService auctionImageService){
        this.auctionService = auctionService;
        this.imageService = imageService;
        this.auctionImageService = auctionImageService;
    }

    @PostMapping
    public ResponseEntity<Auction> create(@RequestBody Auction auction, @RequestParam Long duration, @RequestHeader("Authorization") String token){
        // TODO service return type might also be (id(long), auction(DTO), auction(model), success(boolean))
        try{
            Auction newAuction = auctionService.create(auction, duration);
            return ResponseEntity.ok(newAuction);
        }
        catch (UserNotExistException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> getById(@PathVariable("id") Long id,
                                           @RequestHeader("Authorization") String token) {
        try {
            Auction auction = auctionService.getById(id);
            return ResponseEntity.ok(auction);
        }
        catch (AuctionNotExistException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @GetMapping("/seller/{seller_id}")
    public ResponseEntity<List<Auction>> getBySellerId(@PathVariable("seller_id") Long sellerID,
                                                       @RequestHeader("Authorization") String token,
                                                       @RequestParam(value = "status", required = false) List<Constants.AuctionStatus> statusList,
                                                       @RequestParam(value = "sort", required = false) AuctionSorting sort){
        try {
            List<Auction> auctions;
            if (statusList == null){
                auctions = auctionService.getBySellerId(sellerID, sort);
            }
            else{
                auctions = auctionService.getBySellerIdAndStatus(sellerID, statusList, sort);
            }
            return ResponseEntity.ok(auctions);
        }
        catch (UserNotExistException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @GetMapping("/bidOwner/{bid_owner}")
    public ResponseEntity<List<Auction>> getByBidOwner(@PathVariable("bid_owner") Long bidOwner,
                                                       @RequestHeader("Authorization") String token,
                                                       @RequestParam(value = "sort", required = false) AuctionSorting sort){
        return ResponseEntity.ok(auctionService.getAllByBidOwner(bidOwner, sort));
    }

    @GetMapping("/won/{bid_owner}")
    public ResponseEntity<List<Auction>> getAuctionsWon(@PathVariable("bid_owner") Long bidOwner,
                                                       @RequestHeader("Authorization") String token,
                                                        @RequestParam(value = "sort", required = false) AuctionSorting sort){
        return ResponseEntity.ok(auctionService.getAllWonByBidOwner(bidOwner, sort));
    }

    @PostMapping("/list")
    public ResponseEntity<List<Auction>> getAllByIdIn(@RequestHeader("Authorization") String token,
                                                      @RequestBody List<Long> idList,
                                                      @RequestParam(value = "sort", required = false) AuctionSorting sort){
        System.out.println("[GET AUCTIONS BY LIST REQUEST]:  " + idList);
        List<Auction> auctions = auctionService.getAllByIdIn(idList, sort);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Auction>> getAll(@RequestHeader("Authorization") String token,
                                                @RequestParam(value = "status", required = false) List<Constants.AuctionStatus> statusList,
                                                @RequestParam(value = "sort", required = false) AuctionSorting sort){
        System.out.println("[GET ALL AUCTIONS REQUEST]:  " + statusList + " | " + sort);
        List<Auction> auctions;

        if (statusList == null){
            auctions = auctionService.getAll(sort);
        }
        else{
            auctions = auctionService.getAllByStatus(statusList, sort);
        }

        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<Long>> getImageIDs(@PathVariable("id") Long id,
                                                  @RequestHeader("Authorization") String token){
        System.out.println("[GET IMAGE ID REQUEST]:  " + id);
        List<Long> images = auctionImageService.getImageIDsByAuctionID(id);
        return ResponseEntity.ok(images);
    }

    // TODO change return type
    @GetMapping("/{id}/approveDelivery")
    public ResponseEntity<Boolean> approveDelivery(@PathVariable("id") Long id,
                                                  @RequestHeader("Authorization") String token){
        auctionService.approveDelivery(id);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<Long> uploadImage(@PathVariable("id") Long id, @RequestParam(value= "image",required = true) MultipartFile multipartImage,  @RequestHeader("Authorization") String token) throws Exception {
        // TODO check needed (whether it is successful)
        Long imageID = imageService.addImage(multipartImage);
        AuctionImage auctionImage = auctionImageService.upload(id, imageID);
        return ResponseEntity.ok(imageID);
    }

    @GetMapping("/searchAuction/{auctionTitle}")
    public ResponseEntity<List<Auction>> searchAuctions(@PathVariable("auctionTitle") String auctionTitle/*,
                                                        @RequestHeader("Authorization") String token*/){
        return ResponseEntity.ok(auctionService.getAuctionsByTitleSearch(auctionTitle));
    }



    @GetMapping("/searchCategory")
    public ResponseEntity<List<Auction>> getSelectedAuctionCategory(@RequestParam(value = "categories", required = false) List<Constants.AuctionCategory> categories/*,
                                                        @RequestHeader("Authorization") String token*/){
        List<Auction> auctions;
        if (categories == null){
            auctions = auctionService.getAll(AuctionSorting.UNSORTED);
        }
        else{
            auctions = auctionService.getAllByCategoryIn(categories);
        }

        return ResponseEntity.ok(auctions);

    }
}
