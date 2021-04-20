package com.alfa.bidit.exception;

import com.alfa.bidit.auth.UserCredentials;
import com.alfa.bidit.model.User;

public class UserAlreadyExistsRegistrationException extends RuntimeException{
    public UserAlreadyExistsRegistrationException(String username){
        super(username);
    }
}
