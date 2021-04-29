package com.alfa.bidit.utils;

import org.springframework.data.domain.Sort;

public class Constants {

    public enum AuctionStatus {
        ACTIVE, EXPIRED_SOLD, EXPIRED_UNSOLD, CANCELED
    }
    public enum AuctionCategory{
        ELECTRONIC,GAME,HOME,CAR,VEHICLES,SPORTOUTDOOR,FASHION,BABY,FILMBOOKMUSIC,WORKS,SERVICE,ESTATE,OTHERS

    }

    public interface Rating{
        Long MIN_RATE = 0L;
        Long MAX_RATE = 5L;
    }

    public enum AuctionSorting{
        UNSORTED,
        BY_EXPIRATION_TIME_ASC,
        BY_EXPIRATION_TIME_DESC,
        BY_STARTING_TIME_ASC,
        BY_STARTING_TIME_DESC,
        BY_PRICE_ASC,
        BY_PRICE_DESC
    }

    public enum TransactionStatus{
        WITHDRAW,
        DEPOSIT,
        PENDING_TRANSFER,
        APPROVED_TRANSFER
    }

//    public interface AuctionSorting{
//        Sort UNSORTED = Sort.unsorted();
//        Sort BY_EXPIRATION_TIME_ASC = Sort.by(Sort.Direction.ASC, "expiration_time");
//        Sort BY_EXPIRATION_TIME_DESC = Sort.by(Sort.Direction.DESC, "expiration_time");
//        Sort BY_STARTING_TIME_ASC = Sort.by(Sort.Direction.ASC, "starting_time");
//        Sort BY_STARTING_TIME_DESC = Sort.by(Sort.Direction.DESC, "starting_time");
//        Sort BY_PRICE_ASC = Sort.by(Sort.Direction.ASC, "price");
//        Sort BY_PRICE_DESC = Sort.by(Sort.Direction.DESC, "price");
//    }
}
