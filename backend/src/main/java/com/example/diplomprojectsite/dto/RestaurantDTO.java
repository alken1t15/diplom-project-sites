package com.example.diplomprojectsite.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class RestaurantDTO {

    private String place;
    private LocalTime dateStart;
    private LocalTime dateEnd;
    private String phone;
    private byte[] img;
}
