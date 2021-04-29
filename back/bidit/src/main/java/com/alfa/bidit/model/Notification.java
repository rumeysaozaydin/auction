package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "notifications",
        indexes = {@Index(name = "timeInd", columnList = "time"),
                   @Index(name = "receiverInd", columnList = "receiverID")})
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    Long receiverID;

    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    String content;

    @Column(nullable = false)
    Date time;
}
