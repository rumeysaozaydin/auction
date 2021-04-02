package com.alfa.bidit.repository;

import com.alfa.bidit.model.Bid;
import com.alfa.bidit.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ImageRepository  extends JpaRepository<Image, Long>{
}


