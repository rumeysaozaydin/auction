package com.alfa.bidit.exception;

import com.alfa.bidit.model.Favorite;

public class FavoriteAlreadyExistsException extends RuntimeException{
    public FavoriteAlreadyExistsException(Favorite favorite){
        super(favorite.toString());
    }

    public FavoriteAlreadyExistsException(String s) {
        super(s);
    }
}
