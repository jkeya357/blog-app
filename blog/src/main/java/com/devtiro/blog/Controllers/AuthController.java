package com.devtiro.blog.Controllers;

import com.devtiro.blog.Domain.Dtos.AuthResponse;
import com.devtiro.blog.Domain.Dtos.LoginRequest;
import com.devtiro.blog.Domain.Entities.User;
import com.devtiro.blog.Mappers.UserMapper;
import com.devtiro.blog.Services.AuthenticationService;
import com.devtiro.blog.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth/login")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

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

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody Map<String, String> request){

        String refreshToken = request.get("refreshToken");

        UserDetails userDetails = authenticationService.validateRefreshToken(refreshToken);
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        String newAccessToken = authenticationService.generateToken(user);

        return ResponseEntity.ok(
                AuthResponse.builder()
                        .userId(user.getId())
                        .token(newAccessToken)
                        .expiresIn(86400)
                        .build()
        );
    }
}
