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

    @Query("SELECT p from Product p where p.name like ?1% and p.category.id = ?2")
    List<Product> findByNameLikeIgnoreCaseAndIdCategory(String name, Long id);

    @Query("SELECT p from Product p where p.name like lower(CONCAT('%', ?1, '%')) ")
    List<Product> findByNameIsLikeIgnoreCase(String name);

    @Query("SELECT p from Product p where p.name like ?1% ")
    List<Product> findByNameLikeIgnoreCase(String name);
}