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

    @Column(name = "email",unique = true, length = 100, nullable = false)
    private String email;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "firstname", length = 100)
    private String firstname;

    @Column(name = "lastname", length = 100)
    private String lastname;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "image_id")
    private Long imageID;

    @Column(name="pushToken")
    private String pushToken;

    @Column(name="rating_count")
    private Long ratingCount;

    @Column(name="rating_sum")
    private Long ratingSum;

}
