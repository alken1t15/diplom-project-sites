package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryCart extends JpaRepository<Cart,Long> {

    @Query("select c from Cart c where c.user.id = ?1")
    List<Cart> findByUserId(Long id);
}
