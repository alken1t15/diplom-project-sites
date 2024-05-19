package com.example.diplomprojectsite.dto;

import com.example.diplomprojectsite.entity.AddressUser;
import com.example.diplomprojectsite.entity.Cart;
import com.example.diplomprojectsite.entity.Product;
import com.example.diplomprojectsite.entity.Users;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HistoryOrderDTO {
    private Long id;
    private Integer count;
    private Integer totalPrice;
    private ProductDTO product;
}