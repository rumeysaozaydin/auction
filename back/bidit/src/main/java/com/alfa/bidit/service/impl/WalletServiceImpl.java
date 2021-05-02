package com.alfa.bidit.service.impl;

import com.alfa.bidit.model.Wallet;
import com.alfa.bidit.repository.WalletRepository;
import com.alfa.bidit.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    @Autowired
    public WalletServiceImpl(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    @Override
    public Wallet getByUserID(Long userID) {
        return walletRepository.findWalletByUserID(userID);
    }

    @Override
    public Wallet getByID(Long id) {
        return walletRepository.findWalletById(id);
    }

    @Override
    public boolean depositByUserID(Long userID, Double amount) {
        Wallet wallet = getByUserID(userID);
        wallet.setBalance(wallet.getBalance() + amount);
        walletRepository.save(wallet);
        return true;
    }

    @Override
    public boolean depositByID(Long id, Double amount) {
        Wallet wallet = getByID(id);
        wallet.setBalance(wallet.getBalance() + amount);
        walletRepository.save(wallet);
        return true;
    }

    @Override
    public boolean withdrawByUserID(Long userID, Double amount) {
        Wallet wallet = getByUserID(userID);
        wallet.setBalance(wallet.getBalance() - amount);
        walletRepository.save(wallet);
        return true;
    }

    @Override
    public boolean withdrawByID(Long id, Double amount) {
        Wallet wallet = getByID(id);
        wallet.setBalance(wallet.getBalance() - amount);
        walletRepository.save(wallet);
        return true;
    }

    @Override
    public Wallet createWallet(Long userID) {
        Wallet wallet = new Wallet();
        wallet.setUserID(userID);
        wallet.setBalance(1000.0);
        walletRepository.save(wallet);
        return wallet;
    }

    @Override
    public Double getBalance(Long userID) {
        Wallet wallet = getByUserID(userID);
        return wallet.getBalance();
    }
}
