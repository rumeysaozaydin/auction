package com.alfa.bidit.service.impl;

import com.alfa.bidit.model.Transaction;
import com.alfa.bidit.repository.TransactionRepository;
import com.alfa.bidit.service.NotificationService;
import com.alfa.bidit.service.TransactionService;
import com.alfa.bidit.service.WalletService;
import com.alfa.bidit.utils.Constants.TransactionStatus;
import com.alfa.bidit.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final WalletService walletService;
    private final NotificationService notificationService;


    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, WalletService walletService, NotificationService notificationService) {
        this.transactionRepository = transactionRepository;
        this.walletService = walletService;
        this.notificationService = notificationService;
    }

    @Override
    public void approveTransaction(Long id) {
        Transaction transaction = getByID(id);
        transaction.setStatus(Constants.TransactionStatus.APPROVED_TRANSFER);
        walletService.depositByUserID(transaction.getReceiverID(), transaction.getAmount());
        notificationService.saveInAppNotification(transaction.getReceiverID(), "Alıcı teslimatı onayladı!", "Cüzdanınıza " + transaction.getAmount() + "₺ yatırıldı.");
        notificationService.sendPushNotification(transaction.getReceiverID(), "Alıcı teslimatı onayladı!", "Cüzdanınıza " + transaction.getAmount() + "₺ yatırıldı.");
        transactionRepository.save(transaction);
    }

    @Override
    public Long createTransaction(Long senderID, Long receiverID, Double amount, TransactionStatus status) {
        Transaction transaction = new Transaction();
        transaction.setSenderID(senderID);
        transaction.setReceiverID(receiverID);
        transaction.setAmount(amount);
        transaction.setStatus(status);
        transactionRepository.save(transaction);
        return transaction.getId();
    }

    @Override
    public Transaction getByID(Long id) {
        return transactionRepository.findTransactionById(id);
    }

    @Override
    public Long createTransfer(Long senderID, Long receiverID, Double amount) {
        walletService.withdrawByUserID(senderID, amount);
        notificationService.saveInAppNotification(senderID, "Para Transferi", "Cüzdanınızdan " + amount + "₺ çekildi.");
        notificationService.sendPushNotification(senderID, "Para Transferi", "Cüzdanınızdan " + amount + "₺ çekildi.");
        return createTransaction(senderID, receiverID, amount, TransactionStatus.PENDING_TRANSFER);
    }
}
