package com.example.diplomprojectsite.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String name;
    private Integer price;
    private byte[] img;
    private Double rating;
    private Integer weight;
    private String description;
    private Boolean isFavorite;
}