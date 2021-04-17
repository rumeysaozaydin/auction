package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "auction_expiration_queue", indexes = {@Index(name = "expirationTimeInd", columnList = "expiration_time")})
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class AuctionExpirationRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "auction_id", nullable = false)
    private Long auctionID;

    @Column(name = "expiration_time", nullable = false)
    private Date expirationTime;

    public AuctionExpirationRecord(Long auctionID, Date expirationTime) {
        this.auctionID = auctionID;
        this.expirationTime = expirationTime;
    }
}
