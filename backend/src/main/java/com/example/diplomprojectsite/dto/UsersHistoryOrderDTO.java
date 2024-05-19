package com.example.diplomprojectsite.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UsersHistoryOrderDTO {
    private Long orderId;
    private CartDTO cart;
    private AddressUserDTO addressUser;
    private Boolean active;
    private String comment;
    private String timeOrder;
    private Long total;
    private List<HistoryOrderDTO> historyOrders;
}
