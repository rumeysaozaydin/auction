package com.alfa.bidit.exception;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(){
        super("User does already exist.");
    }

    public UserAlreadyExistsException(String withParams){
        super("User " + withParams + " does already exist.");
    }
}
