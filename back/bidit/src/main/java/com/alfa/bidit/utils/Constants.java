package com.alfa.bidit.utils;

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
}
