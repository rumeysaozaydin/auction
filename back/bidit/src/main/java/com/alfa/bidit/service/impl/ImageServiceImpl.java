package com.alfa.bidit.service.impl;


import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Image;
import com.alfa.bidit.model.User;
import com.alfa.bidit.repository.ImageRepository;
import com.alfa.bidit.repository.UserRepository;
import com.alfa.bidit.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;


    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {

        this.imageRepository = imageRepository;
    }

    public Long addImage(MultipartFile multipartImage) throws IOException {
        Image dbImage = new Image();
        dbImage.setName(multipartImage.getName());
        dbImage.setContent(multipartImage.getBytes());
        return imageRepository.save(dbImage).getId();
    }

    public Resource getById(Long id) {
        byte[] image = imageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                .getContent();

        return new ByteArrayResource(image);
    }

    @Override
    public void clear() {
        imageRepository.deleteAll();
    }

    @Override
    public List<Long> getAll() {
        return imageRepository.findAll().stream().map(image -> { return image.getId();}).collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        imageRepository.deleteById(id);
    }


}
