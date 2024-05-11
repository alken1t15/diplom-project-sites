package com.example.diplomprojectsite.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressUserDTO {
    private Long id;

    private String street;

    private Integer entrance;

    private Integer number;

    private Integer floor;

    private Integer flat;

    private String comment;
}
