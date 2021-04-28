package com.alfa.bidit.repository;

import com.alfa.bidit.model.Bid;
import com.alfa.bidit.model.Image;
import com.alfa.bidit.model.User;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository  extends JpaRepository<Image, Long>{
    @Override
    void deleteAll();

    @Override
    void deleteById(Long id);
}


