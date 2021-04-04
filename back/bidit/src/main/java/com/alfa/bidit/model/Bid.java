package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "bids")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Bid extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userID;

    @Column(name = "auction_id", nullable = false)
    private Long auctionID;

    @Column(name = "price", nullable = false) // DO NOT hesitate to change if you have a better naming idea.
    private Double price;

}
