package com.alfa.bidit.exception;

public class UserEmptyAreaException extends RuntimeException {

    public UserEmptyAreaException(){
        super("Email or password should not be empty.");
    }


}
