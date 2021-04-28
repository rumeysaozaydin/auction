package com.alfa.bidit.repository;

import com.alfa.bidit.model.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
    UserImage findByUserID(Long userID);

    UserImage findUserImageById(Long id);
}
