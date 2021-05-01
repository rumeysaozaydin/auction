package com.alfa.bidit.controller;


import com.alfa.bidit.exception.*;
import com.alfa.bidit.model.Comment;
import com.alfa.bidit.service.CommentService;
import com.alfa.bidit.utils.ApiPaths;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.CommentControllerPath.comment)
@Api(value = ApiPaths.CommentControllerPath.comment)
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/seller/{seller_id}")
    public ResponseEntity<List<Comment>> getAllBySellerID(@RequestHeader("Authorization") String token, @PathVariable("seller_id") Long sellerID){
        List<Comment> comments = commentService.getAllBySellerIDOrderByTimeDesc(sellerID);
        return ResponseEntity.ok(comments);
    }

    @PostMapping()
    public ResponseEntity<Comment> comment(@RequestHeader("Authorization") String token, @RequestBody Comment comment){
        Comment newComment = commentService.comment(comment);
        return ResponseEntity.ok(newComment);
    }
}
