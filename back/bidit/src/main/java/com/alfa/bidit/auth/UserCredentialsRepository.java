package com.alfa.bidit.auth;

import org.springframework.data.repository.CrudRepository;

public interface UserCredentialsRepository extends CrudRepository<UserCredentials, Integer> {
    UserCredentials findByUsername(String username);
}
