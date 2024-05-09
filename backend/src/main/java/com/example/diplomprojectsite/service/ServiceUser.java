package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.UsersAddDTO;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryUsers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceUser {
    private final RepositoryUsers repositoryUsers;
    private final PasswordEncoder passwordEncoder;

    public Users getUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return repositoryUsers.findByEmail(securityContext.getAuthentication().getName()).orElseThrow();
    }


    public Users getUserById(Long id) {
        return repositoryUsers.findById(id).orElseThrow();
    }

    public ResponseEntity addNewUser(UsersAddDTO user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        String newPassword = passwordEncoder.encode(user.getPassword());
        repositoryUsers.save(new Users(user.getEmail(),newPassword,user.getRole(),user.getFirstName()));
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}