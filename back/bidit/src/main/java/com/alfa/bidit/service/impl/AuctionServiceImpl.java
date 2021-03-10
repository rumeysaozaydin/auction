package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistsException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.AuctionRepository;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRepository auctionRepository;

    @Autowired
    public AuctionServiceImpl(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

}