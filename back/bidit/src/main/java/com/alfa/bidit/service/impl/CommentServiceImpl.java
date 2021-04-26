package com.alfa.bidit.service.impl;

import com.alfa.bidit.model.Comment;
import com.alfa.bidit.repository.CommentRepository;
import com.alfa.bidit.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> getAllBySellerID(Long sellerID) {
        return commentRepository.findAllBySellerID(sellerID);
    }
}
