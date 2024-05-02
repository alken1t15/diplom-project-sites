package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.entity.FavoriteProduct;
import com.example.diplomprojectsite.entity.Product;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryFavoriteProduct;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ServiceFavoriteProduct {
    private final RepositoryFavoriteProduct repositoryFavoriteProduct;
    private final ServiceUser serviceUser;
    private final ServiceProduct serviceProduct;

    public boolean isFavoriteProduct(Long idProduct) {
        Users user = serviceUser.getUser();
        FavoriteProduct favoriteProduct = repositoryFavoriteProduct.findByIdUserAndByIdProduct(user.getId(),idProduct).orElse(null);
        return favoriteProduct != null;
    }

    public ResponseEntity addNewFavoriteProduct(Long idProduct) {
        Users users = serviceUser.getUser();
        Product product = serviceProduct.productById(idProduct);
        repositoryFavoriteProduct.save(new FavoriteProduct(product,users));
        return new ResponseEntity(HttpStatus.OK);
    }
}
