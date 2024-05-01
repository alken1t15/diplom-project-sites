package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryRestaurant extends JpaRepository<Restaurant,Long> {
}
