package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.HistoryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RepositoryHistoryOrder extends JpaRepository<HistoryOrder, Long> {

}