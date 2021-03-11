package com.alfa.bidit.controller;

import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll(){
        System.out.println("[GET ALL USERS REQUEST]:  ");
        List<User> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") Long id){
        System.out.println("[GET USER REQUEST]:  " + id);
        try {
            User user = userService.getById(id);
            return ResponseEntity.ok(user);
        }
        catch (UserNotExistException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @PostMapping
    public ResponseEntity<Long> register(@RequestBody User user){
        // TODO email validation needed.
        System.out.println("[USER REGISTER REQUEST]:  " + user);
        try {
            Long id = userService.register(user);
            return ResponseEntity.ok(id);
        }
        catch (UserAlreadyExistsException ex){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, ex.getMessage(), ex);
        }
    }

}
