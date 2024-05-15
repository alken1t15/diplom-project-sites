package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderEditDTO {
    @NotNull
    private Long id;
    @NotEmpty
    @NotNull
    private String status;
}