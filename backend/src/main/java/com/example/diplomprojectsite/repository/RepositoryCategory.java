package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryCategory extends JpaRepository<Category,Long> {
}