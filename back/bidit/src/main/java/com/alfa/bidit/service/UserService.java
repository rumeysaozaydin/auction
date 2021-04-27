package com.alfa.bidit.service;


import com.alfa.bidit.model.User;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
public interface UserService{
    Long register(User user);

    User getById(Long id);

    User getByEmail(String email);

    List<User> getAll();

    Boolean existsById(Long id);

    Boolean existsByEmail(String email);

    Long uploadProfilePhoto(Long id, MultipartFile multipartFile) throws IOException;

    Resource getProfilePhoto(Long id);

    void rateUser(Long id, Long rating);
}