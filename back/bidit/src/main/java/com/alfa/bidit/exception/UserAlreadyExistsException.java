package com.alfa.bidit.exception;

public class UserAlreadyExistsException extends IllegalArgumentException{
    public UserAlreadyExistsException(){
        super("User does already exist.");
    }

    public UserAlreadyExistsException(String withParams){
        super("User " + withParams + " does already exist.");
    }
}
