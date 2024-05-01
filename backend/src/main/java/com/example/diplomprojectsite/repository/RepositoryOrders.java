package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryOrders extends JpaRepository<Orders,Long> {
}
