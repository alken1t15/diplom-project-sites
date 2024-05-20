package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ProductAddDTO {
    @NotNull
    private Long id;
    @NotNull
    @NotBlank
    private String name;
    @NotNull
    private Integer price;
    @NotNull
    private MultipartFile file;
    @Min(0)
    @Max(5)
    private Double rating;
    @NotNull
    private Integer weight;
    @NotNull
    @NotBlank
    private String description;
    @NotNull
    @NotEmpty
    private String composition;
}