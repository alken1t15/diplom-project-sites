package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users_history_order")
@NoArgsConstructor
public class UsersHistoryOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private AddressUser addressUser;

    private Boolean active;

    private String comment;
    @Column(name = "time_order")
    private String timeOrder;

    @Column(name = "order_id")
    private Long orderId;
    private Long total;

    @OneToMany(mappedBy = "usersHistoryOrder")
    private List<HistoryOrder> historyOrders;

    public UsersHistoryOrder(Users user, Cart cart, AddressUser addressUser, Boolean active, String comment, String timeOrder, Long orderId) {
        this.user = user;
        this.cart = cart;
        this.addressUser = addressUser;
        this.active = active;
        this.comment = comment;
        this.timeOrder = timeOrder;
        this.orderId = orderId;
    }

    public UsersHistoryOrder(Users user, Cart cart, AddressUser addressUser, Boolean active, String timeOrder, Long orderId) {
        this.user = user;
        this.cart = cart;
        this.addressUser = addressUser;
        this.active = active;
        this.timeOrder = timeOrder;
        this.orderId = orderId;
    }
}