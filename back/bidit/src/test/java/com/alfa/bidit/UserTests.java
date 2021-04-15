package com.alfa.bidit;

import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.User;
import com.alfa.bidit.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class UserTests {

    // DENEMEK ICIN YAZDIM COK ONEMLI DEGIL

    private User ctx;
    private final UserService userService;

    @Autowired
    public UserTests(UserService userService) {
        this.userService = userService;
    }
}
