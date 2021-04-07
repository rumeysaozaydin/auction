package com.alfa.bidit.auth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentialsDto {

    private String username;
    private String password;
}
