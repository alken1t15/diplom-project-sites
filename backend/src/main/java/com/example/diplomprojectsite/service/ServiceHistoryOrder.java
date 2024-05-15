package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.HistoryOrderDTO;
import com.example.diplomprojectsite.dto.HistoryOrderIsActiveDTO;
import com.example.diplomprojectsite.entity.HistoryOrder;
import com.example.diplomprojectsite.entity.Product;
import com.example.diplomprojectsite.entity.Users;
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

@Service
@AllArgsConstructor
public class ServiceHistoryOrder {
    private final RepositoryHistoryOrder repositoryHistoryOrder;
    private final ServiceUser serviceUser;
    private final ModelMapper modelMapper;
    private final ServiceProduct serviceProduct;

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
}