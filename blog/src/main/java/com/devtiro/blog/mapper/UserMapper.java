package com.devtiro.blog.Mappers;

import com.devtiro.blog.Domain.Dtos.CreateUserRequest;
import com.devtiro.blog.Domain.Dtos.CreateUserRequestDto;
import com.devtiro.blog.Domain.Dtos.UserDto;
import com.devtiro.blog.Domain.Entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.core.userdetails.UserDetails;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserDto toDto(User user);

    CreateUserRequest toUserRequest(CreateUserRequestDto createUserRequestDto);

    User toUser(UserDetails userDetails);
}
