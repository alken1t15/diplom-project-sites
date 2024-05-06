package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;

@Getter
@Setter
public class RestaurantAddDTO {
    @NonNull
    @NotNull
    private String place;
    @NotNull
    private LocalTime dateStart;
    @NotNull
    private LocalTime dateEnd;
    @NotNull
    private String phone;
    @NotNull
    private MultipartFile file;
}