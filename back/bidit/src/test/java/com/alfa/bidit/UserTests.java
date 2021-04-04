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

    User createUser(String email,
                    String firstname,
                    String lastname,
                    String phoneNumber,
                    String password,
                    String imagePath){
        User user = new User();
        user.setEmail(email);
        user.setFirstname(firstname);
        user.setContactNumber(phoneNumber);
        user.setLastname(lastname);
        user.setPassword(password);
        user.setImagePath(imagePath);
        return user;
    }

    @Test
    void userAlreadyExistsTest(){
        User user1 = createUser("asg@gmail.com", "ahmet", "gurbuz", "5344656451", "123456", "image.png");
        User user2 = createUser("asg2@gmail.com", "ahmet", "gurbuz", "5344656451", "123456", "image.png");
        userService.register(user1);
        try {
            userService.register(user2);
        }
        catch (Exception ex){
            assertThat(ex.getClass() == UserAlreadyExistsException.class);
        }
        assertThat(false);
    }
}
