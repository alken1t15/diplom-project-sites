package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryUsers;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ServiceUser {
    private final RepositoryUsers repositoryUsers;

    public Users getUser() {
//        SecurityContext securityContext = SecurityContextHolder.getContext();
//        repositoryUsers.findByEmail(securityContext.getAuthentication().getName()).orElseThrow();
        return repositoryUsers.findById(1L).orElseThrow();
    }


}
