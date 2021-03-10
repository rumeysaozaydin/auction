package com.alfa.bidit.repository;

import com.alfa.bidit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<User,Long>{
}