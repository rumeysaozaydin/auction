package com.alfa.bidit.controller;


import com.alfa.bidit.dto.notificationInfo;
import com.alfa.bidit.model.User;
import com.alfa.bidit.service.impl.NotificationServiceImpl;
import com.alfa.bidit.utils.ApiPaths;

import io.github.jav.exposerversdk.PushClientException;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(ApiPaths.NotificationController.notif)
@Api(value = ApiPaths.NotificationController.notif)
public class NotifController {

   private final NotificationServiceImpl notificationServiceImpl;


    public NotifController(NotificationServiceImpl notificationServiceImpl) {
        this.notificationServiceImpl = notificationServiceImpl;
    }

    @GetMapping(value = "/{pushToken}/{title}/{message}")
    public void deneme(@PathVariable("pushToken") String pushToken,@PathVariable("title") String title,@PathVariable("message") String message) throws PushClientException, InterruptedException {
       // sendNotif("ExponentPushToken[pymoyhG9rYlFIUUFrZP5tf]","başlıkov","messageov");
        notificationServiceImpl.sendNotif(pushToken,title,message);

    }

    @GetMapping(value = "/testo")
    public void denemov() throws PushClientException, InterruptedException {
        notificationServiceImpl.sendNotif("ExponentPushToken[pymoyhG9rYlFIUUFrZP5tf]","başlıkov","messageov");
       // sendNotif(pushToken,title,message);

    }

    @PostMapping(value = "/sendNotifWithBody")
    public void denemovBody(@RequestBody notificationInfo notificationInfo) throws PushClientException, InterruptedException {
        notificationServiceImpl.sendNotif(notificationInfo.getTokenName(),notificationInfo.getTitle(),notificationInfo.getMessage());
        // sendNotif(pushToken,title,message);

    }

}
