package com.alfa.bidit.service;

import com.alfa.bidit.model.Notification;
import io.github.jav.exposerversdk.PushClientException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NotificationService {
    void sendPushNotification(Long userID, String title, String message);

    void sendPushNotification(List<Long> userIDs, String title, String message);

    void saveInAppNotification(Long receiverID, String title, String content);

    void saveInAppNotification(List<Long> receiverIDs, String title, String content);

    List<Notification> getAllByReceiverID(Long receiverID);

    List<Notification> getAll();
}
