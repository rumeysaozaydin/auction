package com.alfa.bidit.model;

import com.alfa.bidit.utils.Constants;
import com.alfa.bidit.utils.Constants.AuctionCategory;
import com.alfa.bidit.utils.Constants.AuctionStatus;
import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "auctions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Auction extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Date startingTime;

    @Column(nullable = false)
    private Date expirationTime;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 400)
    private String description;

    @Column(nullable = false)
    private Long sellerID;

    @Column(nullable = false)
    private Double initialPrice;

    @Column
    private Double highestBid;

    @Column
    private Long highestBidOwner;

    @Column
    private AuctionStatus status;

    @Column
    private AuctionCategory auctionCategory;

    @Column
    private Long transactionID;
}
