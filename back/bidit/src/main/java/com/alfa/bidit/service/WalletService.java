package com.alfa.bidit.service;

import com.alfa.bidit.model.Wallet;
import org.springframework.stereotype.Service;

@Service
public interface WalletService {
    Wallet getByUserID(Long userID);

    Wallet getByID(Long id);

    boolean depositByUserID(Long userID, Double amount);

    boolean depositByID(Long id, Double amount);

    boolean withdrawByUserID(Long userID, Double amount);

    boolean withdrawByID(Long id, Double amount);

    Wallet createWallet(Long userID);

    Double getBalance(Long userID);
}
