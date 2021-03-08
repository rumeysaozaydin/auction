package com.alfa.bidit.service.impl;


import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;





    public UserServiceImpl(UserRepository userRepository) {

        this.userRepository = userRepository;

    }


    @Override
    public User save(User user) {
        User userCheck = userRepository.getByEmail(user.getEmail());

        if (userCheck != null)
            throw new IllegalArgumentException("aynı user name var zaten");

        /*
        User u = new User();
        u.setEmail(user.getEmail());
        u.setContactInfo(user.getContactInfo());
        u.setUsername(user.getUsername());
        u.setPassword(user.getPassword());
        u = userRepository.save(u);
        user.setId(u.getId());
        return user;

         */

        return null;

    }

    @Override
    public User getById(Long id) {
        return null;
    }

    @Override
    public Boolean delete(User user) {
        return null;
    }

    @Override
    public User update(Long id, User user) {
        return null;
    }
}