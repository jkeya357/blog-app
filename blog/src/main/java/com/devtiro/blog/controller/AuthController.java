package com.devtiro.blog.controller;

import com.devtiro.blog.domain.Dtos.AuthResponse;
import com.devtiro.blog.domain.Dtos.LoginRequest;
import com.devtiro.blog.domain.Entities.User;
import com.devtiro.blog.Services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/login")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {


        User user = authenticationService.authenticate(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        String tokenValue = authenticationService.generateToken(user);
        AuthResponse authResponse = AuthResponse.builder()
                .userId(user.getId())
                .token(tokenValue)
                .expiresIn(86400)
                .build();
        return ResponseEntity.ok(authResponse);
    }

}
