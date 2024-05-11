package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
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
    @OneToMany(mappedBy = "user")
    private List<AddressUser> addressUsers;
    @Column(name = "born_date")
    private LocalDate bornDate;

    public Users(String email, String password, String role, String firstName,LocalDate bornDate) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.bornDate = bornDate;
    }
}