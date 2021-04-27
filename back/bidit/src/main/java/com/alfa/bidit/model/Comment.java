package com.alfa.bidit.model;


import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "author_id", nullable = false)
    private Long authorID;

    @Column(name = "author_name", nullable = false) // Front end tekrar ismi çekmekle uğraşmasın diye.
    private String authorName;

    @Column(name = "seller_id", nullable = false)
    private Long sellerID;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "rating", nullable = false) // 1-5
    private Long rating;

    @Column(name = "posting_time", nullable = false)
    private Date postingTime;
}
