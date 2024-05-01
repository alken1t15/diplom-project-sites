package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryUsers extends JpaRepository<Users,Long> {
}