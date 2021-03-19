package com.alfa.bidit.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

// TODO make this @Entity and move the private key "id" field here.

public abstract class BaseModel implements Serializable{

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "created_by",length = 100)
    private String createdBy;
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    @Column(name = "updated_by",length = 100)
    private String updatedBy;

}