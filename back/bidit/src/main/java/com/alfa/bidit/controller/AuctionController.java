package com.alfa.bidit.controller;

import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.impl.UserServiceImpl;
import com.alfa.bidit.utils.ApiPaths;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.AuctionControllerPath.auction)
@Api(value = ApiPaths.AuctionControllerPath.auction)
public class AuctionController {
    private final AuctionService auctionService;

    @Autowired
    public AuctionController(AuctionService auctionService){
        this.auctionService=auctionService;
    }
}
