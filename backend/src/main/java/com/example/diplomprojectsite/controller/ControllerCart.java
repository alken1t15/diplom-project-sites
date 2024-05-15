package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.CartAddDTO;
import com.example.diplomprojectsite.service.ServiceCart;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/cart")
@AllArgsConstructor
public class ControllerCart {
    private ServiceCart serviceCart;

    @GetMapping("/")
    public ResponseEntity getAllCartUser(){
      return   serviceCart.getAllCartUser();
    }

    @PostMapping("/add")
    public ResponseEntity addNewCart(@Validated @RequestBody CartAddDTO cart, BindingResult bindingResult){
        return serviceCart.addNewCart(cart,bindingResult);
    }
}
