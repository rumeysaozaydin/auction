package com.alfa.bidit.exception;

import com.alfa.bidit.model.User;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(User user){
        super(user.toString());
    }
}
