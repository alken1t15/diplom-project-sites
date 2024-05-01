package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryProduct extends JpaRepository<Product,Long> {
}
