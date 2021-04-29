package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "wallets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    Long userID;

    @Column(nullable = false)
    Double balance;
}
