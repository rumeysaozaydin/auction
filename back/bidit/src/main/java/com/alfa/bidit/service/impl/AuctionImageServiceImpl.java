package com.alfa.bidit.service.impl;

import com.alfa.bidit.model.AuctionImage;
import com.alfa.bidit.repository.AuctionImageRepository;
import com.alfa.bidit.service.AuctionImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuctionImageServiceImpl implements AuctionImageService {

    private final AuctionImageRepository auctionImageRepository;

    @Autowired
    public AuctionImageServiceImpl(AuctionImageRepository auctionImageRepository) {
        this.auctionImageRepository = auctionImageRepository;
    }

    @Override
    public List<AuctionImage> getAllByAuctionID(Long auctionID) {
        return auctionImageRepository.findAllByAuctionID(auctionID);
    }

    @Override
    public List<Long> getImageIDsByAuctionID(Long auctionID) {
        return getAllByAuctionID(auctionID).stream().map(AuctionImage::getImageID).collect(Collectors.toList());
    }

    @Override
    public AuctionImage upload(Long auctionID, Long imageID) {
        AuctionImage auctionImage = new AuctionImage();
        auctionImage.setAuctionID(auctionID);
        auctionImage.setImageID(imageID);
        return auctionImageRepository.save(auctionImage);
    }
}
