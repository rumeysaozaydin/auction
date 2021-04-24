package com.alfa.bidit.model;

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

    @Column(name = "starting_time", nullable = false)
    private Date startingTime;

    @Column(name = "expiration_time", nullable = false)
    private Date expirationTime;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "description", length = 400)
    private String description;

    @Column(name = "seller_id", nullable = false)
    private Long sellerID;

    @Column(name = "initial_price", nullable = false)
    private Double initialPrice;

    @Column(name = "highest_bid")
    private Double highestBid;

    @Column(name = "highest_bid_owner")
    private Long highestBidOwner;

    @Column(name = "status")
    private AuctionStatus status;

}
