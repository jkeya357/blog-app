package com.devtiro.blog.Services.impl;

import com.devtiro.blog.Domain.Dtos.CreateUserRequest;
import com.devtiro.blog.Domain.Dtos.CreateUserRequestDto;
import com.devtiro.blog.Domain.Entities.User;
import com.devtiro.blog.Services.UserService;
import com.devtiro.blog.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserById(UUID id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
    }

    @Override
    public User createUser(CreateUserRequest createUserRequest) {

        Optional<User> foundEmail = userRepository.findByEmail(createUserRequest.getEmail());

        if(foundEmail.isPresent()){
            throw new IllegalArgumentException("Email: " + foundEmail + "already exists" );
        }

        User user = new User();
        user.setEmail(createUserRequest.getEmail());
        user.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));
        user.setName(createUserRequest.getName());

        return userRepository.save(user);
    }


}
