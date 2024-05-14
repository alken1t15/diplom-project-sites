package com.example.diplomprojectsite.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HistoryOrderIsActiveDTO {
    @NotNull
    private Boolean isActive;
}