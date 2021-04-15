package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "auction_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class AuctionImage extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "auction_id", nullable = false)
    private Long auctionID;

    @Column(name = "image_id", nullable = false)
    private Long imageID;

}
