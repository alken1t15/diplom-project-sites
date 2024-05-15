package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.CartAddDTO;
import com.example.diplomprojectsite.dto.CartDTO;
import com.example.diplomprojectsite.entity.Cart;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryCart;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceCart {
    private final RepositoryCart repositoryCart;
    private final ServiceUser serviceUser;
    private final ModelMapper modelMapper;


    public ResponseEntity getAllCartUser() {
        Users user = serviceUser.getUser();
        List<Cart> carts = repositoryCart.findByUserId(user.getId());
        if (!carts.isEmpty()) {
            List<CartDTO> cartDTOs = new ArrayList<>();
            for (Cart c : carts) {
                cartDTOs.add(modelMapper.map(c, CartDTO.class));
            }
            return new ResponseEntity(cartDTOs, HttpStatus.OK);
        } else {
            return new ResponseEntity(null, HttpStatus.OK);
        }
    }

    public ResponseEntity addNewCart(CartAddDTO cart, BindingResult bindingResult) {
        Users user = serviceUser.getUser();
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        repositoryCart.save(new Cart(cart.getNumber(),cart.getDate(),cart.getSecurity(),user));
        return new ResponseEntity(HttpStatus.OK);
    }

    public Cart getById(Long idCart) {
        return repositoryCart.findById(idCart).orElseThrow();
    }
}