package com.devtiro.blog.domain.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUserRequest {

    private UUID id;
    private String email;
    private String password;
    private String name;
    private List<PostDto> posts;
    private LocalDateTime createdAt;
}
