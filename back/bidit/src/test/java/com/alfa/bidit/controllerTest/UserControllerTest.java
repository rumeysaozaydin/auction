package com.alfa.bidit.controllerTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import com.alfa.bidit.controller.UserController;
import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.service.impl.UserServiceImpl;
import org.aspectj.lang.annotation.Before;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;




@SpringBootTest
public class UserControllerTest {

    @Autowired
    private UserController userController;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    @Autowired
    private WebApplicationContext wac;

    private MockMvc mvc;

    //@Before
    public void setup() throws Exception {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

/*
    @Test
    public void testUserEmail() {
        Mockito.when(userService.getProductName()).thenReturn("Mock Product Name");
        String testName = orderService.getProductName();
        assertEquals("firstEmail1", testName);

    }


 */

    @Test
    public void contextLoads() throws Exception {
        assertThat(userController).isNotNull();
    }

    @Test
    public void testUserControllerRuns() {
        UserController homeController = new UserController(userService);
        String result = homeController.greeting();
        assertEquals(result, "Guzel Bir Test Olsun");
    }


    @Test
    public void testGetUserById() {
        UserController userController = new UserController(userService);
        ResponseEntity<User> user = userController.getById(1L);
      //  assertEquals(1l, use);
    }



}
