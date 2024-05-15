package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartAddDTO {
    @NotNull
    private String  number;
    @NotNull
    @NotEmpty
    private String date;
    @NotNull
    private Integer security;
}
