package com.example.diplomprojectsite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer price;

    private String img;

    private Double rating;

    private Integer weight;

    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany()
    @JoinTable(
            name = "product_tag",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;
    @OneToMany(mappedBy = "product")
    private List<HistoryOrder> historyOrders;

    @OneToMany(mappedBy = "product")
    private List<Orders> orders;

    @OneToMany(mappedBy = "product")
    private List<FavoriteProduct> favoriteProducts;
}