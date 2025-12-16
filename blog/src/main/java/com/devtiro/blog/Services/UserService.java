package com.devtiro.blog.Services;

import com.devtiro.blog.domain.Dtos.CreateUserRequest;
import com.devtiro.blog.domain.Entities.User;

import java.util.UUID;

public interface UserService {

    User getUserById(UUID id);
    User createUser (CreateUserRequest createUserRequest);
}
