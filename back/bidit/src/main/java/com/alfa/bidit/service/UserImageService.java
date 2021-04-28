package com.alfa.bidit.service;

import com.alfa.bidit.model.User;
import com.alfa.bidit.model.UserImage;
import org.springframework.stereotype.Service;

@Service
public interface UserImageService {
    UserImage getByUserID(Long userID);

    Long getImageIDByUserID(Long userID);

    UserImage getByID(Long id);
}
