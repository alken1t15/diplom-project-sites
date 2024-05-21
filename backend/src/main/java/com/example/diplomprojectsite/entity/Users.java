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
    private String phone;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<HistoryBonus> historyBonus;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<UsersHistoryOrder> historyOrders;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Orders> orders;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<FavoriteProduct> favoriteProducts;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<AddressUser> addressUsers;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Cart> carts;
    @Column(name = "born_date")
    private LocalDate bornDate;

    public Users(String email, String password, String role, String firstName,LocalDate bornDate,Integer bonus) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.bornDate = bornDate;
        this.bonus = bonus;
    }

    public Users(String password, String role, String firstName,LocalDate bornDate,String phone,Integer bonus) {
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.bornDate = bornDate;
        this.phone = phone;
        this.bonus = bonus;
    }
}