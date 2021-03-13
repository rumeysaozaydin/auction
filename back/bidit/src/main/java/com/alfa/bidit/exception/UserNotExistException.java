package com.alfa.bidit.exception;

public class UserNotExistException extends RuntimeException{

    public UserNotExistException(){
        super("User does not exist.");
    }

    public UserNotExistException(String withParams){
        super("User " + withParams + " does not exist.");
    }
}
