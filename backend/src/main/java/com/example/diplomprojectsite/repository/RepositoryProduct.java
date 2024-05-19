package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryProduct extends JpaRepository<Product,Long> {

    @Query("select p from Product p where p.category.id=?1")
    List<Product> findByCategoryId(Long id);

    @Query("select p from  Product p where LOWER(REPLACE(REPLACE(p.name, ' ', ''), '\\t', '')) LIKE LOWER(CONCAT('%', ?1, '%')) and p.category.id = ?2")
    List<Product> findByNameAndIdCategory(String name, Long id);

    List<Product> findByNameLikeIgnoreCase(String name);
}