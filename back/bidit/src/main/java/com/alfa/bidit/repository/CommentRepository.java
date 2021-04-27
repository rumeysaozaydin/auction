package com.alfa.bidit.repository;

import com.alfa.bidit.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllBySellerIDOrderByPostingTimeDesc(Long sellerID);

    boolean existsCommentByAuthorIDAndSellerID(Long authorID, Long sellerID);
}
