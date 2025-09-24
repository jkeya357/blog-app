package com.devtiro.blog.Controllers;

import com.devtiro.blog.Domain.CreatePostRequest;
import com.devtiro.blog.Domain.Dtos.CreatePostRequestDto;
import com.devtiro.blog.Domain.Dtos.PostDto;
import com.devtiro.blog.Domain.Dtos.UpdatePostRequestDto;
import com.devtiro.blog.Domain.Entities.Post;
import com.devtiro.blog.Domain.Entities.User;
import com.devtiro.blog.Domain.UpdatePostRequest;
import com.devtiro.blog.Mappers.PostMapper;
import com.devtiro.blog.Services.PostService;
import com.devtiro.blog.Services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID tagId){

        List<Post> posts = postService.getAllPosts(categoryId, tagId);
        List<PostDto> postDtos = posts.stream().map(postMapper::toDto).toList();
        return ResponseEntity.ok(postDtos);
    }

    @GetMapping(path = "/drafts/{userId}")
    public ResponseEntity<List<PostDto>> getDrafts(@PathVariable UUID userId){
        User loggedInUser = userService.getUserById(userId);
        List<Post> draftPosts = postService.getDraftsPosts(loggedInUser);
        List<PostDto> postDtos = draftPosts.stream().map(postMapper::toDto).toList();
        return ResponseEntity.ok(postDtos);
    }

    @PostMapping(path = "/{id}")
    public ResponseEntity<PostDto> createPost(
            @Valid @RequestBody CreatePostRequestDto createPostRequestDto,
            @PathVariable  UUID id
            ){
        User loggedInUser = userService.getUserById(id);
        CreatePostRequest createPostRequest = postMapper.toCreatePostRequest(createPostRequestDto);
        Post createdPost = postService.createPost(loggedInUser, createPostRequest);
        PostDto createdPostDto = postMapper.toDto(createdPost);
        return new ResponseEntity<>(createdPostDto, HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<PostDto> updatePost(
            @PathVariable UUID id,
            @Valid @RequestBody UpdatePostRequestDto updatePostRequestDto
            ){
            UpdatePostRequest updatePostRequest = postMapper.toUpdatePostRequest(updatePostRequestDto);
            Post updatePost = postService.updatePost(id, updatePostRequest);
            PostDto updatePostDto = postMapper.toDto(updatePost);
            return ResponseEntity.ok(updatePostDto);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<PostDto> getPost(
            @PathVariable UUID id
    ){
        Post post = postService.getPost(id);
        PostDto postDto = postMapper.toDto(post);
        return ResponseEntity.ok(postDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id){
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
