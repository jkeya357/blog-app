package com.devtiro.blog.Mappers;

import com.devtiro.blog.Domain.CreatePostRequest;
import com.devtiro.blog.Domain.Dtos.CreatePostRequestDto;
import com.devtiro.blog.Domain.Dtos.PostDto;
import com.devtiro.blog.Domain.Dtos.UpdatePostRequestDto;
import com.devtiro.blog.Domain.Entities.Post;
import com.devtiro.blog.Domain.UpdatePostRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    //target=what you want to map it to & source=what you're mapping from
    @Mapping(target = "author", source = "author")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    PostDto toDto(Post post);

    CreatePostRequest toCreatePostRequest(CreatePostRequestDto dto);

    UpdatePostRequest toUpdatePostRequest(UpdatePostRequestDto dto);
}
