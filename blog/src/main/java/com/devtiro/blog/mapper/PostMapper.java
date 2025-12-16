package com.devtiro.blog.mapper;

import com.devtiro.blog.domain.CreatePostRequest;
import com.devtiro.blog.domain.Dtos.CreatePostRequestDto;
import com.devtiro.blog.domain.Dtos.PostDto;
import com.devtiro.blog.domain.Dtos.UpdatePostRequestDto;
import com.devtiro.blog.domain.Entities.Post;
import com.devtiro.blog.domain.UpdatePostRequest;
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
