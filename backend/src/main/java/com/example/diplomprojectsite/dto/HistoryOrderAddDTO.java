package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class HistoryOrderAddDTO {
    @NotNull
    private List<Long> idOrders;
    @NotNull
    private Long idCart;
    @NotNull
    private Long idAddress;
    private String comment;
    @NotNull
    @NotEmpty
    private String timeOrder;
}
