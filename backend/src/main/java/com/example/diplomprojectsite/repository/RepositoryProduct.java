package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryProduct extends JpaRepository<Product,Long> {

    @Query("select p from Product p where p.category.id=?1")
    List<Product> findByCategoryId(Long id);
}
