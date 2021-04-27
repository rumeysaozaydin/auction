package com.alfa.bidit.exception;

import java.util.Date;

public class GlobalExceptionResponse {


    private String message;
    private Date date;

    public GlobalExceptionResponse() {
    }

    public GlobalExceptionResponse(String message, Date date) {
        this.message = message;
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }


    @Override
    public String toString() {
        return "GlobalExceptionResponse{" +
                "message='" + message + '\'' +
                ", date=" + date +
                '}';
    }
}