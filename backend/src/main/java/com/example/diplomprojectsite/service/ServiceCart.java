package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.repository.RepositoryCart;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ServiceCart {
    private final RepositoryCart repositoryCart;


}