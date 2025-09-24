package com.devtiro.blog.Services;

import com.devtiro.blog.Domain.Dtos.CreateUserRequest;
import com.devtiro.blog.Domain.Dtos.CreateUserRequestDto;
import com.devtiro.blog.Domain.Entities.User;

import java.util.UUID;

public interface UserService {

    User getUserById(UUID id);
    User createUser (CreateUserRequest createUserRequest);
}
