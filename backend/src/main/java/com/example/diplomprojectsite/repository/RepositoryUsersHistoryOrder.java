package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.HistoryOrder;
import com.example.diplomprojectsite.entity.UsersHistoryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RepositoryUsersHistoryOrder extends JpaRepository<UsersHistoryOrder,Long> {

    @Query("select h from UsersHistoryOrder h where h.user.id = ?1 and h.active = ?2")
    List<UsersHistoryOrder> findByUserIdAndStatus(Long id, Boolean status);

    Optional<UsersHistoryOrder> findByOrderId(Long orderId);
}
