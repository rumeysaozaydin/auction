package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "users", indexes = {@Index(name = "emailInd", columnList = "email")})
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class User extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name= "uname",length = 100,unique = true,nullable = false)
    private String username;

    @Column(name = "email",length = 100,nullable = false)
    private String email;


    @Column(name = "pwd",length = 200,nullable = false)
    private String password;

    @Column(name = "name_surname",length = 200)
    private String nameSurname;

    @Column(name = "contactInfo")
    private String contactInfo;

    @Column(name = "image")
    private String image;




}
