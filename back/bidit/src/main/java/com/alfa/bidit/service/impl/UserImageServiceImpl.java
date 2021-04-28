package com.alfa.bidit.service.impl;

import com.alfa.bidit.model.UserImage;
import com.alfa.bidit.repository.UserImageRepository;
import com.alfa.bidit.service.UserImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserImageServiceImpl implements UserImageService {

    private final UserImageRepository userImageRepository;

    @Autowired
    public UserImageServiceImpl(UserImageRepository userImageRepository) {
        this.userImageRepository = userImageRepository;
    }

    @Override
    public UserImage getByUserID(Long userID) {
        return userImageRepository.findByUserID(userID);
    }

    @Override
    public Long getImageIDByUserID(Long userID) {
        UserImage userImage = getByUserID(userID);

        if (userImage == null) return null;

        return userImage.getImageID();
    }

    @Override
    public UserImage getByID(Long id) {
        return userImageRepository.findUserImageById(id);
    }
}
