package com.alfa.bidit.repository;

import com.alfa.bidit.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Wallet findWalletByUserID(Long userID);

    Wallet findWalletById(Long id);
}
