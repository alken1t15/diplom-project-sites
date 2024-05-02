package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.FavoriteProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RepositoryFavoriteProduct extends JpaRepository<FavoriteProduct,Long> {

    @Query("select f from FavoriteProduct f where f.user.id=?1 and  f.product.id= ?2")
    Optional<FavoriteProduct> findByIdUserAndByIdProduct(Long idUser, Long idProduct);
}
