package com.alfa.bidit.controller;


import com.alfa.bidit.model.Notification;
import com.alfa.bidit.service.NotificationService;
import com.alfa.bidit.utils.ApiPaths;

import io.github.jav.exposerversdk.PushClientException;
import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.NotificationController.notif)
@Api(value = ApiPaths.NotificationController.notif)
public class NotificationController {

   private final NotificationService notificationService;


    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping(value = "/send/{user_id}/{title}/{message}")
    public void sendNotification(@PathVariable("user_id") Long userID,@PathVariable("title") String title,@PathVariable("message") String message) throws PushClientException, InterruptedException {
        notificationService.sendPushNotification(userID,title,message);
    }

    @GetMapping(value = "/receiver/{receiver_id}")
    public ResponseEntity<List<Notification>> getAllInAppNotificationsByReceiverID(@PathVariable("receiver_id") Long receiverID,
                                                                                   @RequestHeader("Authorization") String token) {
        List<Notification> notifications = notificationService.getAllByReceiverID(receiverID);
        return ResponseEntity.ok(notifications);
    }
}
