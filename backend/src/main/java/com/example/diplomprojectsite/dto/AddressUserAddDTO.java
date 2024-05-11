package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressUserAddDTO {
    @NotNull
    @NotEmpty
    private String street;
    @NotNull
    private Integer entrance;
    @NotNull
    private Integer number;
    @NotNull
    private Integer floor;
    @NotNull
    private Integer flat;

    private String comment;
}