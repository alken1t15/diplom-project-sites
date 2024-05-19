package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "cart")
@Getter
@Setter
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;

    private String date;

    private Integer security;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @OneToMany(mappedBy = "cart")
    private List<UsersHistoryOrder> historyOrder;

    public Cart(String number, String date, Integer security, Users user) {
        this.number = number;
        this.date = date;
        this.security = security;
        this.user = user;
    }
}