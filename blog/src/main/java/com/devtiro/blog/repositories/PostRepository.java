package com.devtiro.blog.repositories;

import com.devtiro.blog.Domain.Entities.Category;
import com.devtiro.blog.Domain.Entities.Post;
import com.devtiro.blog.Domain.Entities.Tag;
import com.devtiro.blog.Domain.Entities.User;
import com.devtiro.blog.Domain.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

    List<Post> findAllByStatusAndCategoryAndTagsContaining(PostStatus status, Category category, Tag tag);
    List<Post> findAllByStatusAndCategory(PostStatus status, Category category);
    List<Post> findAllByStatusAndTagsContaining(PostStatus status, Tag tag);
    List<Post> findAllByStatus(PostStatus postStatus);
    List<Post> findAllByAuthorAndStatus(User author, PostStatus status);
}
