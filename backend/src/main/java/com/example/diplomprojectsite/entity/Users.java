package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String role;
    @Column(name = "first_name")
    private String firstName;

    private String jwt;

    private Integer bonus;
    @OneToMany(mappedBy = "user")
    private List<HistoryBonus> historyBonus;
    @OneToMany(mappedBy = "user")
    private List<HistoryOrder> historyOrders;
    @OneToMany(mappedBy = "user")
    private List<Orders> orders;
    @OneToMany(mappedBy = "user")
    private List<FavoriteProduct> favoriteProducts;
}