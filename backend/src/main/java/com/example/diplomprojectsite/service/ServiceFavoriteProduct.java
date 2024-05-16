package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.entity.FavoriteProduct;
import com.example.diplomprojectsite.entity.Product;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryFavoriteProduct;
import com.example.diplomprojectsite.repository.RepositoryProduct;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceFavoriteProduct {
    private final RepositoryFavoriteProduct repositoryFavoriteProduct;
    private final ServiceUser serviceUser;
    private final RepositoryProduct repositoryProduct;

    public boolean isFavoriteProduct(Long idProduct) {
        Users user = serviceUser.getUser();
        FavoriteProduct favoriteProduct = repositoryFavoriteProduct.findByIdUserAndByIdProduct(user.getId(), idProduct).orElse(null);
        return favoriteProduct != null;
    }

    public ResponseEntity addNewFavoriteProduct(Long idProduct) {
        Users user = serviceUser.getUser();
        Product product = repositoryProduct.findById(idProduct).orElse(null);
        if (product == null) {
            return new ResponseEntity("Такого товара нету", HttpStatus.BAD_REQUEST);
        }
        repositoryFavoriteProduct.save(new FavoriteProduct(product, user));
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteNewFavoriteProduct(Long idProduct) {
        Users user = serviceUser.getUser();
        repositoryFavoriteProduct.removeByUserIdAndProductId(user.getId(), idProduct);
        return new ResponseEntity(HttpStatus.OK);
    }

}