package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.HistoryOrderAddDTO;
import com.example.diplomprojectsite.dto.HistoryOrderDTO;
import com.example.diplomprojectsite.dto.HistoryOrderIsActiveDTO;
import com.example.diplomprojectsite.dto.UsersHistoryOrderDTO;
import com.example.diplomprojectsite.entity.*;
import com.example.diplomprojectsite.repository.RepositoryHistoryOrder;
import com.example.diplomprojectsite.repository.RepositoryUsersHistoryOrder;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class ServiceHistoryOrder {
    private final RepositoryHistoryOrder repositoryHistoryOrder;
    private final ServiceUser serviceUser;
    private final ModelMapper modelMapper;
    private final ServiceProduct serviceProduct;
    private final ServiceOrder serviceOrder;
    private final ServiceCart serviceCart;
    private final ServiceAddressUser serviceAddressUser;
    private final RepositoryUsersHistoryOrder repositoryUsersHistoryOrder;

    public ResponseEntity getAllHistoryOrder(HistoryOrderIsActiveDTO historyOrder, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Users user = serviceUser.getUser();
        List<UsersHistoryOrder> usersHistoryOrders = repositoryUsersHistoryOrder.findByUserIdAndStatus(user.getId(), historyOrder.getIsActive());
        if (!usersHistoryOrders.isEmpty()) {
            List<UsersHistoryOrderDTO> usersHistoryOrderDTOs = new ArrayList<>();

            for (UsersHistoryOrder h : usersHistoryOrders) {
                UsersHistoryOrderDTO historyOrderDTO = modelMapper.map(h,UsersHistoryOrderDTO.class);
                usersHistoryOrderDTOs.add(historyOrderDTO);
//                HistoryOrderDTO historyOrderDTO = modelMapper.map(h, HistoryOrderDTO.class);
//                Product product = serviceProduct.productById(historyOrderDTO.getProduct().getId());
//                historyOrderDTO.getProduct().setImg(serviceProduct.getFile(product.getImg()));
//                historyOrderDTOs.add(historyOrderDTO);
            }
            return new ResponseEntity(usersHistoryOrderDTOs, HttpStatus.OK);
        } else {
            return new ResponseEntity(null, HttpStatus.OK);
        }
    }

    public ResponseEntity addNewHistoryOrder(HistoryOrderAddDTO historyOrder, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Users user = serviceUser.getUser();
        Random random = new Random();
        long randomNumber;
        while (true) {
            randomNumber = random.nextInt(100000) + 1;
            UsersHistoryOrder usersHistoryOrder = repositoryUsersHistoryOrder.findByOrderId(randomNumber).orElse(null);
            if (usersHistoryOrder == null) {
                break;
            }
        }
        Cart cart = serviceCart.getById(historyOrder.getIdCart());
        AddressUser addressUser = serviceAddressUser.getById(historyOrder.getIdAddress());
        UsersHistoryOrder usersHistoryOrder;
        long total=0;
        if (historyOrder.getComment() != null) {
            usersHistoryOrder = repositoryUsersHistoryOrder.save(new UsersHistoryOrder(user, cart, addressUser, true, historyOrder.getComment(), historyOrder.getTimeOrder(), randomNumber));
        } else {
            usersHistoryOrder = repositoryUsersHistoryOrder.save(new UsersHistoryOrder(user, cart, addressUser, true, historyOrder.getTimeOrder(), randomNumber));
        }
        for (Long id : historyOrder.getIdOrders()) {
            Orders order = serviceOrder.getById(id);
            repositoryHistoryOrder.save(new HistoryOrder(order.getCount(),order.getTotalPrice(),order.getProduct(),usersHistoryOrder));
            total+=order.getTotalPrice();
            serviceOrder.delete(order);
        }
        int bonusAdd = (int) (total * 0.05);
        if (historyOrder.getBonus()){
            if (total>user.getBonus()){
                total= total-user.getBonus();
                user.setBonus(0);
            }else {
                long bonus = user.getBonus()- total;
                user.setBonus((int) bonus);
                total = 0;
            }
        }
        user.setBonus(user.getBonus()+bonusAdd);
        serviceUser.saveUser(user);
        usersHistoryOrder.setTotal(total);
        repositoryUsersHistoryOrder.save(usersHistoryOrder);
        return new ResponseEntity(HttpStatus.OK);
    }
}