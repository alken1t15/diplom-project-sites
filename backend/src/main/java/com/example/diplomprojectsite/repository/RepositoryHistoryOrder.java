package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.HistoryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryHistoryOrder extends JpaRepository<HistoryOrder, Long> {
    @Query("select h from HistoryOrder h where h.user.id = ?1 and h.active = ?2")
    List<HistoryOrder> findByUserIdAndStatus(Long id, Boolean status);
}