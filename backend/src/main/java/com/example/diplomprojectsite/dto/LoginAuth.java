package com.example.diplomprojectsite.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginAuth {
    private String login;
    private String password;
    private LocalDate date;
    private String phone;
}