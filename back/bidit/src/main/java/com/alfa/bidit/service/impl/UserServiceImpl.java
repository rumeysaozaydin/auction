package com.alfa.bidit.service.impl;


import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistsException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long register(User user) {
        Optional<User> optionalStudent = userRepository.findByEmail(user.getEmail());

        if(optionalStudent.isPresent()) throw new UserAlreadyExistsException("with email: " + user.getEmail());

        userRepository.save(user);
        return user.getId();
    }

    public User getById(Long id) {
        Optional<User> optionalStudent = userRepository.findById(id);

        if(optionalStudent.isEmpty()) throw new UserNotExistsException("with id: " + id);

        return optionalStudent.get();
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }
}