package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.OrderAddDTO;
import com.example.diplomprojectsite.service.ServiceOrder;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@AllArgsConstructor
public class ControllerOrder{
    private final ServiceOrder serviceOrder;

    @PostMapping("/add")
    public ResponseEntity addNewOrder(@Validated @RequestBody OrderAddDTO order, BindingResult bindingResult){
      return   serviceOrder.addNewOrder(order,bindingResult);
    }

    @GetMapping("/")
    public ResponseEntity getAllOrder(){
        return serviceOrder.getAllOrder();
    }
}
