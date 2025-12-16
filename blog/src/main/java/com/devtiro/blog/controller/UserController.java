package com.devtiro.blog.controller;

import com.devtiro.blog.domain.Dtos.CreateUserRequest;
import com.devtiro.blog.domain.Dtos.CreateUserRequestDto;
import com.devtiro.blog.domain.Dtos.UserDto;
import com.devtiro.blog.domain.Entities.User;
import com.devtiro.blog.mapper.UserMapper;
import com.devtiro.blog.Services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity<UserDto> createUser(
            @Valid @RequestBody CreateUserRequestDto createUserRequestDto
            ){
            CreateUserRequest createUserRequest = userMapper.toUserRequest(createUserRequestDto);
            User user = userService.createUser(createUserRequest);
            UserDto createdUser = userMapper.toDto(user);
            return ResponseEntity.ok(createdUser);

    }
}
