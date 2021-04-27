package com.alfa.bidit.utils;

public class Constants {

    public enum AuctionStatus {
        ACTIVE, EXPIRED_SOLD, EXPIRED_UNSOLD, CANCELED
    }

    public interface Rating{
        Long MIN_RATE = 0L;
        Long MAX_RATE = 5L;
    }
}
