package com.example.diplomprojectsite.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDTO {
    private Long id;

    private String number;

    private String date;

    private Integer security;
}