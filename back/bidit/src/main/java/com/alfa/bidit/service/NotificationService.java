package com.alfa.bidit.service;

import io.github.jav.exposerversdk.PushClientException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NotificationService {
    void sendNotification(Long userID, String title, String message) throws PushClientException, InterruptedException;

    void sendNotification(List<Long> userIDs, String title, String message) throws PushClientException, InterruptedException;
}
