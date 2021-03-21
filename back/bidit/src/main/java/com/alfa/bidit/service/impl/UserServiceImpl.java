package com.alfa.bidit.service.impl;


import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserEmptyAreaException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

   // private final ModelMapper modelMapper; // yeni

    @Autowired // modelmapper tarafı ek
    public UserServiceImpl(UserRepository userRepository/*,ModelMapper modelMapper*/) {

        this.userRepository = userRepository;
       // this.modelMapper=modelMapper;
    }

    public Long register(User user) {
        Optional<User> optionalStudent = userRepository.findUserByEmail(user.getEmail());

        if(optionalStudent.isPresent()) throw new UserAlreadyExistsException(user);

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

    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Boolean existsById(Long id) {
        return userRepository.existsUserById(id);
    }
}