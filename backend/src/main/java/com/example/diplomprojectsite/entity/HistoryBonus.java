package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "history_bonus")
public class HistoryBonus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    private Integer bonus;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users user;
}
