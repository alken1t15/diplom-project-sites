package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.CategoryDTO;
import com.example.diplomprojectsite.dto.ProductAddDTO;
import com.example.diplomprojectsite.dto.ProductDTO;
import com.example.diplomprojectsite.dto.ProductOneDTO;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.service.ServiceCategory;
import com.example.diplomprojectsite.service.ServiceFavoriteProduct;
import com.example.diplomprojectsite.service.ServiceProduct;
import com.example.diplomprojectsite.service.ServiceUser;
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
@CrossOrigin
public class ControllerProduct {
    private final ServiceProduct serviceProduct;
    private final ServiceCategory serviceCategory;
    private final ServiceFavoriteProduct serviceFavoriteProduct;
    private final ServiceUser serviceUser;


    //Получение всех товаров и категорий для главной страницы || Получение товаров по категории
    @GetMapping("/")
    public ResponseEntity getMainPage(@RequestParam(required = false) Long idCategory) {
        Users user = serviceUser.getUser();
        List<CategoryDTO> categories = serviceCategory.getAllCategory();
        List<ProductDTO> products;
        if (idCategory == null) {
            products = serviceProduct.getAllProduct();
        } else {
            products = serviceProduct.getProductByCategory(idCategory);
        }
        if (products == null) {
            return new ResponseEntity("Такой категории нету", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity(new ProductMainDTO(categories, products, user.getBonus(),user.getOrders().size()), HttpStatus.OK);
        }
    }

    // Получение определенного товара
    @GetMapping("/{id}")
    public Object getProductById(@Validated @NonNull @PathVariable Long id) {
        Users user = serviceUser.getUser();
        ProductOneDTO product = serviceProduct.getProductById(id);
        product.setCountOrder(user.getOrders().size());
        return Objects.requireNonNullElseGet(product, () -> new ResponseEntity<>("Нету такого товара с таким id", HttpStatus.BAD_REQUEST));
    }

    // Добавление нового товара
    @PostMapping("/add")
    private ResponseEntity addNewProduct(@Validated ProductAddDTO productAddDTO, BindingResult bindingResult) {
        return serviceProduct.addNewProduct(productAddDTO, bindingResult);
    }

    // Добавление в любимые
    @GetMapping("/favorite/add")
    private ResponseEntity addFavoriteProduct(@RequestParam Long idProduct) {
        return serviceFavoriteProduct.addNewFavoriteProduct(idProduct);
    }

    // Удаление из любимых
    @GetMapping("/favorite/delete")
    private ResponseEntity deleteFavoriteProduct(@RequestParam Long idProduct) {
        return serviceFavoriteProduct.deleteNewFavoriteProduct(idProduct);
    }

    public record ProductMainDTO(List<CategoryDTO> categories, List<ProductDTO> products, Integer bonus,Integer countOrder) {
    }

}