package com.alfa.bidit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import java.util.Date;


@ControllerAdvice
@RestController
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler{


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exHandler(Exception exception, WebRequest webRequest) {
        GlobalExceptionResponse response = new GlobalExceptionResponse(exception.getMessage(),new Date());
        ResponseEntity<?> entity = new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
        logger.error("Hata :  " +exception.getMessage());

        return entity;
    }

}