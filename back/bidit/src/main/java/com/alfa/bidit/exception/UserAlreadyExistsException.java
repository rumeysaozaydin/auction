package com.alfa.bidit.exception;

import com.alfa.bidit.model.User;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String user){
        super(user.toString());
    }
}
