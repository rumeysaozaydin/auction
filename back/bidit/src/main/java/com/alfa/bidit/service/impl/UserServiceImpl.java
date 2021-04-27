package com.alfa.bidit.service.impl;


import com.alfa.bidit.exception.InvalidRatingException;
import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.ImageService;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ImageService imageService;


    @Autowired
    public UserServiceImpl(UserRepository userRepository,ImageService imageService) {

        this.userRepository = userRepository;
        this.imageService = imageService;
    }

    public Long register(User user) {
        if(existsByEmail(user.getEmail())) throw new UserAlreadyExistsException(user);

        user.setImageID(-1L); // TODO USER PP EKLE

        user.setRatingCount(0L);
        user.setRatingSum(0L);

        userRepository.save(user);
        return user.getId();
    }

    public User getById(Long id) {
        Optional<User> optionalStudent = userRepository.findUserById(id);

        if(optionalStudent.isEmpty()) throw new UserNotExistException("with id: " + id);

        return optionalStudent.get();
    }

    public User getByEmail(String email) {
        Optional<User> optionalStudent = userRepository.findUserByEmail(email);

        if(optionalStudent.isEmpty()) throw new UserNotExistException("with email: " + email);

        return optionalStudent.get();
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }


    public Boolean existsById(Long id) {
        return userRepository.existsUserById(id);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsUserByEmail(email);
    }

    @Override
    public Long uploadProfilePhoto(Long id, MultipartFile multipartFile) throws IOException {
        // TODO Do not forget to delete the previous photo.
        User user = getById(id);
        Long imageID = imageService.addImage(multipartFile);
        user.setImageID(imageID);
        userRepository.save(user);
        return imageID;
    }

    @Override
    public Resource getProfilePhoto(Long id) {
        User user = getById(id);
        Long imageId = user.getImageID();
        return imageService.getById(imageId);
    }

    @Override
    public void rateUser(Long id, Long rating) {
        validateRating(rating);
        User user = getById(id);
        user.setRatingSum(user.getRatingSum() + rating);
        user.setRatingCount(user.getRatingCount() + 1);
        userRepository.save(user);
    }

    private void validateRating(Long rating){
        if(rating < Constants.Rating.MIN_RATE ||
            rating > Constants.Rating.MAX_RATE)
            throw new InvalidRatingException();
    }
}