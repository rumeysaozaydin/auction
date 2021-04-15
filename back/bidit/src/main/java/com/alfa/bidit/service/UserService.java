package com.alfa.bidit.service;


import com.alfa.bidit.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@Service
public interface UserService{
    Long register(User user);

    User getById(Long id);

    User getByEmail(String email);

    List<User> getAll();

    Boolean existsById(Long id);

    Boolean existsByEmail(String email);
}