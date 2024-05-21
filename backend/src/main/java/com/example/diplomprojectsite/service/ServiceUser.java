package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.UserDTO;
import com.example.diplomprojectsite.dto.UserGetInformation;
import com.example.diplomprojectsite.dto.UsersAddDTO;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryUsers;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

    public Users getUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String getName = securityContext.getAuthentication().getName();
        try {
            Long.parseLong(getName);
            return repositoryUsers.findByPhone(securityContext.getAuthentication().getName()).orElseThrow();
        }catch (Exception e) {
            return repositoryUsers.findByEmail(securityContext.getAuthentication().getName()).orElseThrow();
        }
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
        if (user.getEmail()==null && user.getPhone()==null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else if (user.getEmail()==null){
            repositoryUsers.save(new Users(newPassword,user.getRole(),user.getFirstName(),user.getBornDate(),user.getPhone(),0));
        }
        else {
            repositoryUsers.save(new Users(user.getEmail(),newPassword,user.getRole(),user.getFirstName(),user.getBornDate(),0));
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    public ResponseEntity getAlreadyUser() {
        Users user = getUser();
        return new ResponseEntity(modelMapper.map(user, UserDTO.class),HttpStatus.OK);
    }

    public ResponseEntity removeUser() {
        Users user = getUser();
        repositoryUsers.delete(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    public void saveUser(Users user) {
        repositoryUsers.save(user);
    }

    public ResponseEntity getInformationBonusAndCount() {
        Users user = getUser();
        int count = user.getOrders().size();
        int bonus = user.getBonus();
        return new ResponseEntity(new UserGetInformation(count,bonus),HttpStatus.OK);
    }
}