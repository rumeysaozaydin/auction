package com.alfa.bidit.controller;

import com.alfa.bidit.service.ImageService;
import com.alfa.bidit.utils.ApiPaths;
import io.github.jav.exposerversdk.PushClientException;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.ImageControllerPath.image)
@Api(value = ApiPaths.ImageControllerPath.image)
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController( ImageService imageService){
        this.imageService=imageService;
    }

    @PostMapping
    public ResponseEntity<Long> register(@RequestParam (value= "image",required = true) MultipartFile multipartImage) throws Exception {
        Long id = imageService.addImage(multipartImage);
        return ResponseEntity.ok(id);

    }

    @GetMapping(value = "/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long imageId) {
        return imageService.getById(imageId);
    }

    @GetMapping("/all")
    public List<Long> getAll(){
        return imageService.getAll();
    }

    @GetMapping("/clear")
    public void clear(){
        imageService.clear();
    }
}
