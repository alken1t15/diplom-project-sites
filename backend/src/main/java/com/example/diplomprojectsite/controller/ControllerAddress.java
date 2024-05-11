package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.AddressUserAddDTO;
import com.example.diplomprojectsite.service.ServiceAddressUser;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/address")
@AllArgsConstructor
public class ControllerAddress {

    private final ServiceAddressUser serviceAddressUser;

    @GetMapping("/")
    public ResponseEntity getAllAddressUser(){
      return   serviceAddressUser.getAllAddressUser();
    }

    @PostMapping("/add")
    public ResponseEntity addNewAddress(@Validated @RequestBody AddressUserAddDTO addressUser, BindingResult bindingResult){
        return serviceAddressUser.addNewAddress(addressUser,bindingResult);
    }
}
