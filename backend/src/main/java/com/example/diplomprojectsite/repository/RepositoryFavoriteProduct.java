package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.FavoriteProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryFavoriteProduct extends JpaRepository<FavoriteProduct,Long> {
}
