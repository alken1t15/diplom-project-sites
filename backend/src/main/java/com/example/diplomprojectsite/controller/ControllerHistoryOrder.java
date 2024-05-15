package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.HistoryOrderIsActiveDTO;
import com.example.diplomprojectsite.service.ServiceHistoryOrder;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/history/order")
@AllArgsConstructor
public class ControllerHistoryOrder {
    private ServiceHistoryOrder serviceHistoryOrder;

    @PostMapping("/")
    public ResponseEntity getAllHistoryOrder(@Validated @RequestBody HistoryOrderIsActiveDTO historyOrder, BindingResult bindingResult){
        return serviceHistoryOrder.getAllHistoryOrder(historyOrder,bindingResult);
    }
}
