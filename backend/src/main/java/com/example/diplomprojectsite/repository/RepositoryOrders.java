package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Orders;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryOrders extends JpaRepository<Orders,Long> {
    @Query("select o from Orders o where  o.user.id = ?1")
    List<Orders> findByUserId(Long id);
}
