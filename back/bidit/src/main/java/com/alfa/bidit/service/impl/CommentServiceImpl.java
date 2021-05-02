package com.alfa.bidit.service.impl;

import com.alfa.bidit.exception.CommentAuthorNotValidException;
import com.alfa.bidit.exception.MultiCommentException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Comment;
import com.alfa.bidit.repository.CommentRepository;
import com.alfa.bidit.service.CommentService;
import com.alfa.bidit.service.UserService;
import com.alfa.bidit.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    @Override
    public List<Comment> getAllBySellerIDOrderByTimeDesc(Long sellerID) {
        return commentRepository.findAllBySellerIDOrderByPostingTimeDesc(sellerID);
    }

    @Override
    public Comment comment(Comment comment) {
        if(comment.getAuthorID().equals(comment.getSellerID()))
            throw new CommentAuthorNotValidException("Kendinize yorum yapamazsınız.");

        if(!userService.existsById(comment.getAuthorID())
            || !userService.existsById(comment.getSellerID()))
            throw new UserNotExistException("Kullanıcı mevcut değil.");

        if(commentRepository.existsCommentByAuthorIDAndSellerID(comment.getAuthorID(), comment.getSellerID()))
            throw new MultiCommentException("Bu kullanıcıya daha önce yorum verdiniz.");

        comment.setPostingTime(DateUtil.now());

        userService.rateUser(comment.getSellerID(), comment.getRating());

        commentRepository.save(comment);
        return comment;
    }
}
