package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.CategoryDTO;
import com.example.diplomprojectsite.dto.ProductAddDTO;
import com.example.diplomprojectsite.dto.ProductDTO;
import com.example.diplomprojectsite.dto.ProductOneDTO;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.service.ServiceCategory;
import com.example.diplomprojectsite.service.ServiceFavoriteProduct;
import com.example.diplomprojectsite.service.ServiceProduct;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ControllerProduct {
    private final ServiceProduct serviceProduct;
    private final ServiceCategory serviceCategory;
    private final ServiceFavoriteProduct serviceFavoriteProduct;


    @GetMapping("/")
    public Object getMainPage() {
        List<CategoryDTO> categories = serviceCategory.getAllCategory();
        List<ProductDTO> products = serviceProduct.getAllProduct();

        return null;
    }

    @GetMapping("/{id}")
    public Object getProductById(@Validated @NonNull @PathVariable Long id) {
        ProductOneDTO product = serviceProduct.getProductById(id);
        return Objects.requireNonNullElseGet(product, () -> new ResponseEntity<>("Нету такого товара с таким id", HttpStatus.BAD_REQUEST));
    }

    @PostMapping("/add")
    private ResponseEntity addNewProduct(@Validated ProductAddDTO productAddDTO, BindingResult bindingResult) {
        return serviceProduct.addNewProduct(productAddDTO, bindingResult);
    }

    // Добавление в любимые
    @PostMapping("/favorite/add")
    private ResponseEntity addFavoriteProduct(Long idProduct){
        return serviceFavoriteProduct.addNewFavoriteProduct(idProduct);
    }

}