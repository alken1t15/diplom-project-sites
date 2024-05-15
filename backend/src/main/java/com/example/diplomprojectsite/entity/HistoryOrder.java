package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "history_order")
@NoArgsConstructor
public class HistoryOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer count;
    @Column(name = "total_price")
    private Integer totalPrice;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users user;

    @Column(name = "order_id")
    private Long orderId;

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

    public HistoryOrder(Integer count, Integer totalPrice, Product product, Users user, Long orderId, Cart cart, AddressUser addressUser, Boolean active, String comment, String timeOrder) {
        this.count = count;
        this.totalPrice = totalPrice;
        this.product = product;
        this.user = user;
        this.orderId = orderId;
        this.cart = cart;
        this.addressUser = addressUser;
        this.active = active;
        this.comment = comment;
        this.timeOrder = timeOrder;
    }

    public HistoryOrder(Integer count, Integer totalPrice, Product product, Users user, Long orderId, Cart cart, AddressUser addressUser, Boolean active, String timeOrder) {
        this.count = count;
        this.totalPrice = totalPrice;
        this.product = product;
        this.user = user;
        this.orderId = orderId;
        this.cart = cart;
        this.addressUser = addressUser;
        this.active = active;
        this.timeOrder = timeOrder;
    }
}