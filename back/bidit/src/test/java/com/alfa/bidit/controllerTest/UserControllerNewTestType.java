package com.alfa.bidit.controllerTest;

import com.alfa.bidit.controller.UserController;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class UserControllerNewTestType {

    @InjectMocks
    private UserController restService;


    private MockMvc mvc;

    @BeforeAll
    public void setup() {
        MockitoAnnotations.initMocks(this);
        Mockito.when(restService.greeting()).thenReturn("Guzel Bir Test Olsun");
        mvc = MockMvcBuilders.standaloneSetup(restService).build();
    }

    /*
    @Test
    public void test() throws Exception {
        String requestBodyJson = "{ \"requestValue1\":\"val1\", \"requestValue2\":\"2\" }";

        MvcResult result = mvc
                .perform(Mockito.post("").content(requestBodyJson).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();

        MockHttpServletResponse response = result.getResponse();
        String responseMessage = response.getContentAsString();
        assertThat(responseMessage).isEqualTo("{\"responseValue1\":\"val1service\",\"responseValue2\":2}");
    }

     */
}
