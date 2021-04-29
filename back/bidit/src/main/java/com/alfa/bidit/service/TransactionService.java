package com.alfa.bidit.service;

import com.alfa.bidit.model.Transaction;
import com.alfa.bidit.utils.Constants.TransactionStatus;
import org.springframework.stereotype.Service;

@Service
public interface TransactionService {
    void approveTransaction(Long id);

    Long createTransaction(Long senderID, Long receiverID, Double amount, TransactionStatus status);

    Transaction getByID(Long id);

    Long createTransfer(Long senderID, Long receiverID, Double amount);
}
