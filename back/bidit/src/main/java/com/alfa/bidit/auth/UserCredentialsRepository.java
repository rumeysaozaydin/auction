package com.alfa.bidit.auth;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialsRepository extends CrudRepository<UserCredentials, Integer> {
    UserCredentials findByUsername(String username);
}
