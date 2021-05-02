package com.alfa.bidit.controller;

import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.service.WalletService;
import com.alfa.bidit.utils.ApiPaths;
import io.github.jav.exposerversdk.PushClientException;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.UserControllerPath.control)
@Api(value = ApiPaths.UserControllerPath.control)
public class UserController {

    private final UserService userService;
    private final WalletService walletService;

    @Autowired
    public UserController(UserService userService, WalletService walletService){
        this.userService=userService;
        this.walletService = walletService;
    }

    @GetMapping("/all")
   // @ApiOperation(value = "Get All Users",response = User.class)
    public ResponseEntity<List<User>> getAll(@RequestHeader("Authorization") String token) throws PushClientException, InterruptedException {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") Long id, @RequestHeader("Authorization") String token){
        User user = userService.getById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable("email") String email, @RequestHeader("Authorization") String token){
        User user = userService.getByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}/balance")
    public ResponseEntity<Double> getBalanceByID(@PathVariable("id") Long id, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(walletService.getByUserID(id).getBalance());
    }

    @PostMapping
    public ResponseEntity<Long> register(@RequestBody User user, @RequestHeader("Authorization") String token){
        // TODO email validation needed.
        Long id = userService.register(user);
        return ResponseEntity.ok(id);
    }

    @PostMapping(value = "/{id}/image")
    public ResponseEntity<Long> uploadProfilePhoto(@RequestParam MultipartFile multipartImage, @PathVariable Long id) throws Exception {
        Long imageId = userService.uploadProfilePhoto(id, multipartImage);
        return ResponseEntity.ok(imageId);
    }

    @GetMapping(value = "/{id}/image", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long id) {
        return userService.getProfilePhoto(id);
    }
}
