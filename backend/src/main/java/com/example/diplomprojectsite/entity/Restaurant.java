package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@Table(name = "restaurant")
@NoArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String place;
    @Column(name = "date_start")
    private LocalTime dateStart;

    @Column(name = "date_end")
    private LocalTime dateEnd;

    private String phone;
    private String img;

    public Restaurant(String place, LocalTime dateStart, LocalTime dateEnd, String phone, String img) {
        this.place = place;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.phone = phone;
        this.img = img;
    }
}