package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.OrderAddDTO;
import com.example.diplomprojectsite.dto.OrderDTO;
import com.example.diplomprojectsite.dto.OrderEditDTO;
import com.example.diplomprojectsite.entity.HistoryOrder;
import com.example.diplomprojectsite.entity.Orders;
import com.example.diplomprojectsite.entity.Product;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryOrders;
import com.example.diplomprojectsite.repository.RepositoryProduct;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceOrder {
    private final RepositoryOrders repositoryOrders;
    private final ServiceUser serviceUser;
    private final RepositoryProduct repositoryProduct;

    @Value("${path.file}")
    private String pathSave;

    @Autowired
    public ServiceOrder(RepositoryOrders repositoryOrders, ServiceUser serviceUser, RepositoryProduct repositoryProduct) {
        this.repositoryOrders = repositoryOrders;
        this.serviceUser = serviceUser;
        this.repositoryProduct = repositoryProduct;
    }

    //Сохранение нового заказа
    public ResponseEntity addNewOrder(OrderAddDTO order, BindingResult bindingResult) {
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
        Product product = repositoryProduct.findById(order.getProductId()).orElse(null);
        if (product == null) {
            return new ResponseEntity("Такого товара нету", HttpStatus.BAD_REQUEST);
        }
        Orders orders = repositoryOrders.findByUserIdAndProductId(user.getId(), product.getId()).orElse(null);
        if (orders==null) {
            int totalPrice = order.getCount() * product.getPrice();
            repositoryOrders.save(new Orders(order.getCount(), totalPrice, product, user));
        }
        else {
            int totalPrice = orders.getCount()+order.getCount() * product.getPrice();
            orders.setCount(orders.getCount()+order.getCount());
            orders.setTotalPrice(totalPrice);
            repositoryOrders.save(orders);
        }
        return new ResponseEntity(HttpStatus.OK);
    }


    //Получение всех товаров с корзины
    public ResponseEntity getAllOrder() {
        Users user = serviceUser.getUser();
        List<Orders> orders = repositoryOrders.findByUserId(user.getId());
        List<OrderDTO> orderDTOs = new ArrayList<>();
        long total = 0;
        for (Orders o : orders) {
            byte[] img;
            try {
                img = Files.readAllBytes(Paths.get(pathSave + o.getProduct().getImg()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            total+= o.getTotalPrice();
            orderDTOs.add(new OrderDTO(o.getId(), o.getProduct().getName(), img, o.getCount(),o.getTotalPrice()));
        }
        return new ResponseEntity(new OrderReturn(orderDTOs,total),HttpStatus.OK);
    }

    public ResponseEntity editCountOrder(OrderEditDTO orderEdit, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Orders order = repositoryOrders.getReferenceById(orderEdit.getId());
        Product product = order.getProduct();
        int price = product.getPrice();
        if (orderEdit.getStatus().equals("+")){
            order.setCount(order.getCount()+1);
            order.setTotalPrice(price*order.getCount());
            repositoryOrders.save(order);
        }
        else {
            int count = order.getCount();
            if (count-1!=0){
                order.setCount(order.getCount()-1);
                order.setTotalPrice(price*order.getCount());
                repositoryOrders.save(order);
            }
            else {
                repositoryOrders.delete(order);
            }
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public Orders getById(Long id) {
        return repositoryOrders.findById(id).orElseThrow();
    }

    public void delete(Orders order) {
        repositoryOrders.delete(order);
    }

    public record OrderReturn(List<OrderDTO> orderDTOs,Long total){}
}