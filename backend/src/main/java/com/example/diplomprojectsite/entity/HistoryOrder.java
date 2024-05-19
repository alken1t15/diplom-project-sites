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
    @JoinColumn(name = "users_history_order_id")
    private UsersHistoryOrder usersHistoryOrder;

    public HistoryOrder(Integer count, Integer totalPrice, Product product, UsersHistoryOrder usersHistoryOrder) {
        this.count = count;
        this.totalPrice = totalPrice;
        this.product = product;
        this.usersHistoryOrder = usersHistoryOrder;
    }
}