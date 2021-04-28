package com.alfa.bidit.service;


import com.alfa.bidit.model.Image;
import com.alfa.bidit.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface ImageService {


    Long addImage(MultipartFile image) throws IOException;

    Resource getById(Long id);

    void clear();

    List<Long> getAll();

    void deleteById(Long id);

}
