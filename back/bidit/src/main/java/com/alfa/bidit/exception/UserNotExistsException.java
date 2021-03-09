package com.alfa.bidit.exception;

public class UserNotExistsException extends IllegalArgumentException{
    public UserNotExistsException(){
        super("User does not exist.");
    }

    public UserNotExistsException(String withParams){
        super("User " + withParams + " does not exist.");
    }
}
