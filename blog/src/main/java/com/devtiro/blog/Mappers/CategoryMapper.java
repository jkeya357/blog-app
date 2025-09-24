package com.devtiro.blog.Mappers;

import com.devtiro.blog.Domain.Dtos.CategoryDto;
import com.devtiro.blog.Domain.Dtos.CreateCategoryRequest;
import com.devtiro.blog.Domain.Entities.Category;
import com.devtiro.blog.Domain.Entities.Post;
import com.devtiro.blog.Domain.PostStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostCount")
    CategoryDto toDto(Category category);

    Category toEntity(CreateCategoryRequest createCategoryRequest);

    @Named("calculatePostCount")
    default long calculatePostCount(List<Post> posts) {
        if(null == posts){
            return 0;
        }
        return posts.stream()
                .filter(post -> PostStatus.PUBLISHED.equals(post.getStatus()))
                .count();
    }
}
