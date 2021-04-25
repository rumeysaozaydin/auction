package com.alfa.bidit.repository;

import com.alfa.bidit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    Optional<User> findUserById(Long id);

    Optional<User> findUserByEmail(String email);

    Boolean existsUserByEmail(String email);

    Boolean existsUserById(Long id);

    User findByEmail(String email);

}