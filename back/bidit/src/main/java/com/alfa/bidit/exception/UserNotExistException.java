package com.alfa.bidit.exception;

public class UserNotExistException extends RuntimeException{

    public UserNotExistException(){
        super("Kullanıcı mevcut değil.");
    }

    public UserNotExistException(String s){
        super(s);
    }
}
