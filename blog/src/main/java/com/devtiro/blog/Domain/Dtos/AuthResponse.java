package com.devtiro.blog.Domain.Dtos;

import com.devtiro.blog.Domain.Entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private long expiresIn;
    private UUID userId;
}
