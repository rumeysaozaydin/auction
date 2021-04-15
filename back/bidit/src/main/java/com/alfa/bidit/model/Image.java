package com.alfa.bidit.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Lob
    byte[] content;

    @Column(name = "name", nullable = false)
    String name;
    @Column(name = "location")
    String location;

}
