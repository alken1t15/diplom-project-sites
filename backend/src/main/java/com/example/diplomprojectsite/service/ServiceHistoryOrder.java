package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.HistoryOrderAddDTO;
import com.example.diplomprojectsite.dto.HistoryOrderDTO;
import com.example.diplomprojectsite.dto.HistoryOrderIsActiveDTO;
import com.example.diplomprojectsite.entity.*;
import com.example.diplomprojectsite.repository.RepositoryHistoryOrder;
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
        List<HistoryOrder> historyOrders = repositoryHistoryOrder.findByUserIdAndStatus(user.getId(),historyOrder.getIsActive());
        if (!historyOrders.isEmpty()){
            List<HistoryOrderDTO> historyOrderDTOs = new ArrayList<>();
            for (HistoryOrder h : historyOrders){
                HistoryOrderDTO historyOrderDTO = modelMapper.map(h, HistoryOrderDTO.class);
                Product product = serviceProduct.productById(historyOrderDTO.getProduct().getId());
                historyOrderDTO.getProduct().setImg(serviceProduct.getFile(product.getImg()));
                historyOrderDTOs.add(historyOrderDTO);
            }
            return new ResponseEntity(historyOrderDTOs,HttpStatus.OK);
        }
        else {
            return new ResponseEntity(null,HttpStatus.OK);
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
        while (true){
             randomNumber = random.nextInt(100000) + 1;
            HistoryOrder historyOrder2 = repositoryHistoryOrder.findByOrderId(randomNumber).orElse(null);
            if (historyOrder2==null){
                break;
            }
        }
        Cart cart = serviceCart.getById(historyOrder.getIdCart());
        AddressUser addressUser = serviceAddressUser.getById(historyOrder.getIdAddress());
        for (Long id: historyOrder.getIdOrders()){
            Orders order = serviceOrder.getById(id);
            HistoryOrder historyOrder1;
            if (historyOrder.getComment()!=null) {
                 historyOrder1 = new HistoryOrder(order.getCount(), order.getTotalPrice(), order.getProduct(), user, randomNumber, cart, addressUser, true, historyOrder.getComment(), historyOrder.getTimeOrder());
            }
            else {
                historyOrder1 = new HistoryOrder(order.getCount(), order.getTotalPrice(), order.getProduct(), user, randomNumber, cart, addressUser, true, historyOrder.getTimeOrder());
            }
            repositoryHistoryOrder.save(historyOrder1);
            serviceOrder.delete(order);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}