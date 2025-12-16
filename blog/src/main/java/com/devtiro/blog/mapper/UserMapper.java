package com.devtiro.blog.mapper;

import com.devtiro.blog.domain.Dtos.CreateUserRequest;
import com.devtiro.blog.domain.Dtos.CreateUserRequestDto;
import com.devtiro.blog.domain.Dtos.UserDto;
import com.devtiro.blog.domain.Entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.core.userdetails.UserDetails;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserDto toDto(User user);

    CreateUserRequest toUserRequest(CreateUserRequestDto createUserRequestDto);

    User toUser(UserDetails userDetails);
}
