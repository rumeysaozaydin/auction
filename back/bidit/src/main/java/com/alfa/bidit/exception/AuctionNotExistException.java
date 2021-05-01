package com.alfa.bidit.exception;

public class AuctionNotExistException extends RuntimeException{

    public AuctionNotExistException(){

    }

    public AuctionNotExistException(String s) {
        super(s);
    }
}
