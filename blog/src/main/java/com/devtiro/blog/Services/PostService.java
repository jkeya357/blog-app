package com.devtiro.blog.Services;

import com.devtiro.blog.Domain.CreatePostRequest;
import com.devtiro.blog.Domain.Entities.Post;
import com.devtiro.blog.Domain.Entities.User;
import com.devtiro.blog.Domain.UpdatePostRequest;

import java.util.List;
import java.util.UUID;

public interface PostService {

    Post getPost(UUID id);
    List<Post> getAllPosts(UUID categoryId, UUID tagId);
    List<Post> getDraftsPosts(User user);
    Post createPost(User user, CreatePostRequest createPostRequest);
    Post updatePost(UUID id, UpdatePostRequest updatePostRequest);
    void deletePost(UUID id);
}
