package com.alfa.bidit.service.impl;


import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.ImageService;
import com.alfa.bidit.service.UserService;
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

   // private final ModelMapper modelMapper; // yeni

    @Autowired // modelmapper tarafı ek
    public UserServiceImpl(UserRepository userRepository,/*,ModelMapper modelMapper*/ImageService imageService) {

        this.userRepository = userRepository;
       // this.modelMapper=modelMapper;
        this.imageService = imageService;
    }

    public Long register(User user) {
        if(existsByEmail(user.getEmail())) throw new UserAlreadyExistsException(user);

        user.setImageID(-1L);

     //   if (user.getEmail()==null || user.getPassword()==null) throw  new UserEmptyAreaException();

     //   User u = modelMapper.map(user, User.class);
        userRepository.save(user); //yerine alt satır ve modelmapper için üst geldi
    //    userRepository.save(u);
       // user.setId(u.getId());

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
}