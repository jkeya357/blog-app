package com.devtiro.blog.Domain.Dtos;

import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserRequestDto {


    private UUID id;
    @NotNull(message = "Email is required")
    private String email;
    @NotNull(message = "Password cannot be empty")
    @Size(min = 8, max = 16, message = "Password must be between {min} and {max} characters")
    private String password;
    @Size(min = 3, message = "name must be at-least {min} characters")
    private String name;
}
