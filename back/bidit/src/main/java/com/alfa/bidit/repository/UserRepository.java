package com.alfa.bidit.repository;

import com.alfa.bidit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findById(Long id);

    Optional<User> findUserByEmail(String email);
}