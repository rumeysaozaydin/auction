package com.alfa.bidit.service.impl;

import com.alfa.bidit.model.Notification;
import com.alfa.bidit.repository.NotificationRepository;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.NotificationService;
import com.alfa.bidit.service.UserService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.ExpoPushMessageTicketPair;
import io.github.jav.exposerversdk.ExpoPushReceipt;
import io.github.jav.exposerversdk.ExpoPushTicket;
import io.github.jav.exposerversdk.PushClient;
import io.github.jav.exposerversdk.PushClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static com.alfa.bidit.utils.DateUtil.*;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final UserService userService;
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(UserRepository userRepository, UserService userService, NotificationRepository notificationRepository) {
        this.userService = userService;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void sendPushNotification(List<Long> userIDs, String title, String message){
        for(Long userID : userIDs) sendPushNotification(userID, title, message);
    }

    @Override
    public void sendPushNotification(Long userID, String title, String message) {

       String recipient=userService.getById(userID).getPushToken();

       if (recipient==null)
           return;

        try{
            if (!PushClient.isExponentPushToken(recipient))
                throw new Exception("Token:" + recipient + " is not a valid token.");

            ExpoPushMessage expoPushMessage = new ExpoPushMessage();
            expoPushMessage.getTo().add(recipient);
            expoPushMessage.setTitle(title);
            expoPushMessage.setBody(message);


            List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
            expoPushMessages.add(expoPushMessage);

            PushClient client = new PushClient();

            List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

            List<CompletableFuture<List<ExpoPushTicket>>> messageRepliesFutures = new ArrayList<>();

            for (List<ExpoPushMessage> chunk : chunks) {
                messageRepliesFutures.add(client.sendPushNotificationsAsync(chunk));
            }

            // Wait for each completable future to finish
            List<ExpoPushTicket> allTickets = new ArrayList<>();
            for (CompletableFuture<List<ExpoPushTicket>> messageReplyFuture : messageRepliesFutures) {
                try {
                    allTickets.addAll(messageReplyFuture.get());
                } catch (InterruptedException | ExecutionException e) {
                    e.printStackTrace();
                }
            }

            List<ExpoPushMessageTicketPair<ExpoPushMessage>> zippedMessagesTickets = client.zipMessagesTickets(expoPushMessages, allTickets);

            List<ExpoPushMessageTicketPair<ExpoPushMessage>> okTicketMessages = client.filterAllSuccessfulMessages(zippedMessagesTickets);
            String okTicketMessagesString = okTicketMessages.stream().map(
                    p -> "Title: " + p.message.getTitle() + ", Id:" + p.ticket.getId()
            ).collect(Collectors.joining(","));

            List<ExpoPushMessageTicketPair<ExpoPushMessage>> errorTicketMessages = client.filterAllMessagesWithError(zippedMessagesTickets);
            String errorTicketMessagesString = errorTicketMessages.stream().map(
                    p -> "Title: " + p.message.getTitle() + ", Error: " + p.ticket.getDetails().getError()
            ).collect(Collectors.joining(","));

            List<String> ticketIds = (client.getTicketIdsFromPairs(okTicketMessages));
            CompletableFuture<List<ExpoPushReceipt>> receiptFutures = client.getPushNotificationReceiptsAsync(ticketIds);

            List<ExpoPushReceipt> receipts = new ArrayList<>();
            try {
                receipts = receiptFutures.get();
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }

        } catch (Exception e){
            System.out.println("GENERAL ERROR IN PUSH NOTIFICATION " + e.getMessage());
        }

    }


    @Override
    public void saveInAppNotification(Long receiverID, String title, String content) {
        Notification notification = new Notification();
        notification.setReceiverID(receiverID);
        notification.setTitle(title);
        notification.setContent(content);
        notification.setTime(now());

        notificationRepository.save(notification);
    }

    @Override
    public void saveInAppNotification(List<Long> receiverIDs, String title, String content) {
        for(Long receiverID : receiverIDs) saveInAppNotification(receiverID, title, content);
    }


    @Override
    public List<Notification> getAllByReceiverID(Long receiverID) {
        return notificationRepository.findAllByReceiverIDOrderByTimeDesc(receiverID);
    }

    @Override
    public List<Notification> getAll() {
        return notificationRepository.findAll();
    }
}
