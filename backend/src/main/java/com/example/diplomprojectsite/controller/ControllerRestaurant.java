package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.RestaurantAddDTO;
import com.example.diplomprojectsite.service.ServiceRestaurant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/restaurant")
@AllArgsConstructor
@CrossOrigin
public class ControllerRestaurant {
    private final ServiceRestaurant serviceRestaurant;


    @GetMapping("/")
    public ResponseEntity getAllRestaurant (){
        return serviceRestaurant.getAllRestaurant();
    }

    @PostMapping("/add")
    public ResponseEntity addNewRestaurant(@Validated RestaurantAddDTO restaurant, BindingResult bindingResult){
        return serviceRestaurant.addNewRestaurant(restaurant,bindingResult);
    }
}
