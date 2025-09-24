package com.devtiro.blog.Services;

import com.devtiro.blog.Domain.Entities.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {

    User authenticate(String email, String password);
    String generateToken(User user);
    UserDetails validateToken(String token);
    UserDetails validateRefreshToken(String token);
}
