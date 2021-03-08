package com.alfa.bidit.repository;

import com.alfa.bidit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    User getById(Long id);

    User getByEmail(String mail);


}