package com.alfa.bidit.service;

import com.alfa.bidit.model.AuctionImage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AuctionImageService {

    List<AuctionImage> getAllByAuctionID(Long auctionID);

    List<Long> getImageIDsByAuctionID(Long auctionID);

    AuctionImage upload(Long auctionID, Long imageID);
}
