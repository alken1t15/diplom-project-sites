package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "address_user")
@Getter
@Setter
@NoArgsConstructor
public class AddressUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;

    private Integer entrance;

    private Integer number;

    private Integer floor;

    private Integer flat;

    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @OneToMany(mappedBy = "addressUser")
    private List<UsersHistoryOrder> historyOrders;

    public AddressUser(String street, Integer entrance, Integer number, Integer floor, Integer flat, String comment, Users user) {
        this.street = street;
        this.entrance = entrance;
        this.number = number;
        this.floor = floor;
        this.flat = flat;
        this.comment = comment;
        this.user = user;
    }

    public AddressUser(String street, Integer entrance, Integer number, Integer floor, Integer flat, Users user) {
        this.street = street;
        this.entrance = entrance;
        this.number = number;
        this.floor = floor;
        this.flat = flat;
        this.user = user;
    }
}