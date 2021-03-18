package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "favorites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Favorite extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userID;

    @Column(name = "auction_id", nullable = false)
    private Long auctionID;

}
