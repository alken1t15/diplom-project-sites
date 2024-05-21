package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
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

    @Column(name = "date_order")
    private LocalDateTime dateOrder;

    @OneToMany(mappedBy = "usersHistoryOrder",cascade = CascadeType.ALL)
    private List<HistoryOrder> historyOrders;

    public UsersHistoryOrder(Users user, Cart cart, AddressUser addressUser, Boolean active, String comment, String timeOrder, Long orderId,LocalDateTime dateOrder) {
        this.user = user;
        this.cart = cart;
        this.addressUser = addressUser;
        this.active = active;
        this.comment = comment;
        this.timeOrder = timeOrder;
        this.orderId = orderId;
        this.dateOrder = dateOrder;
    }

    public UsersHistoryOrder(Users user, Cart cart, AddressUser addressUser, Boolean active, String timeOrder, Long orderId,LocalDateTime dateOrder) {
        this.user = user;
        this.cart = cart;
        this.addressUser = addressUser;
        this.active = active;
        this.timeOrder = timeOrder;
        this.orderId = orderId;
        this.dateOrder = dateOrder;
    }
}