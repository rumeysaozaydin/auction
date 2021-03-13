package com.alfa.bidit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {


    private Long id;

    private String email;

    private String firstname;

    private String lastname;

    private String contactNumber;

    private String imagePath;


}
