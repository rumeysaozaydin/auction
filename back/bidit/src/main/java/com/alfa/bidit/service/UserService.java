package com.alfa.bidit.service;


import com.alfa.bidit.model.User;

public interface UserService{


    User save(User userDto);


    User getById(Long id);

    Boolean delete(User user);

    User update(Long id, User user);
}