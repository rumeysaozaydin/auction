package com.alfa.bidit.model;

import com.alfa.bidit.utils.Constants.TransactionStatus;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    Long senderID;

    @Column(nullable = false)
    Long receiverID;

    @Column(nullable = false)
    TransactionStatus status;

    @Column(nullable = false)
    Double amount;
}
