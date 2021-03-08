package com.alfa.bidit.controller;

import com.alfa.bidit.model.User;
import com.alfa.bidit.service.impl.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserServiceImpl userServiceImpl;

    public UserController(UserServiceImpl userServiceImpl){

        this.userServiceImpl=userServiceImpl;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getByIdWithSql(@PathVariable(value = "id",required = true) Long id){
        User user=  userServiceImpl.getById(id);
        return ResponseEntity.ok(user);

    }

}
