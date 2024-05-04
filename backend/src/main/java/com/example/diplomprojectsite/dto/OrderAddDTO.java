package com.example.diplomprojectsite.dto;

import com.example.diplomprojectsite.entity.Product;
import com.example.diplomprojectsite.entity.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderAddDTO {
    @NotNull
    private Integer count;
    @NotNull
    private Long productId;
}