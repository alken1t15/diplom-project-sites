package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UsersAddDTO {
    @NotNull
    @NotEmpty
    private String email;
    @NotNull
    @NotEmpty
    private String password;
    @NotNull
    @NotEmpty
    private String role;
    @NotNull
    @NotEmpty
    private String firstName;
    @NotNull
    private LocalDate bornDate;
    @NotNull
    private String phone;
}