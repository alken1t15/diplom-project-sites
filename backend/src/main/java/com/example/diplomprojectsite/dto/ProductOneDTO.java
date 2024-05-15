package com.example.diplomprojectsite.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductOneDTO {
    private Long id;
    private String name;
    private Integer price;
    private byte[] img;
    private Double rating;
    private Integer weight;
    private String description;
    private Boolean isFavorite;
    private List<TagDTO> tag;
    private Integer countOrder;
}