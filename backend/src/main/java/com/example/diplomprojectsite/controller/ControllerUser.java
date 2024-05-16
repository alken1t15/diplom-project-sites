package com.example.diplomprojectsite.controller;

import com.example.diplomprojectsite.dto.LoginAuth;
import com.example.diplomprojectsite.dto.UsersAddDTO;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryUsers;
import com.example.diplomprojectsite.security.JWTUtil;
import com.example.diplomprojectsite.service.ServiceUser;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class ControllerUser {
    private Logger logger = LoggerFactory.getLogger(ControllerUser.class);
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final RepositoryUsers repositoryUser;

    @Autowired
    private final ServiceUser serviceUser;


    public ControllerUser(JWTUtil jwtUtil, AuthenticationManager authenticationManager, RepositoryUsers repositoryUser, ServiceUser serviceUser) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.repositoryUser = repositoryUser;
        this.serviceUser = serviceUser;
    }

    @PostMapping("/jwt")
    public Map<String, Object> loginHandler(@RequestBody LoginAuth loginAuth) {
        if (StringUtils.isBlank(loginAuth.getLogin()) || StringUtils.isBlank(loginAuth.getPassword())) {
            throw new BadCredentialsException("Одно из полей пустое");
        }
        logger.info(String.format("Авторизация пользваоетяля: логин: %s пароль: %s", loginAuth.getLogin(), loginAuth.getPassword()));
        Authentication token = UsernamePasswordAuthenticationToken.unauthenticated(loginAuth.getLogin(), loginAuth.getPassword());
        Authentication authenticationResponse = this.authenticationManager.authenticate(token);
        Users user = repositoryUser.findByEmail(loginAuth.getLogin()).orElseThrow();
        if (!StringUtils.isBlank(user.getJwt())){
            throw new BadCredentialsException("Токен уже был получен ранее");
        }
        logger.info(String.format("Пользователь который хочет получить jwt токен: %s", authenticationResponse));
        String jwt = jwtUtil.generateToken(loginAuth.getLogin(), loginAuth.getPassword());
        user.setJwt(jwt);
        repositoryUser.save(user);
        logger.info(String.format("JWT: %s", jwt));
        HashMap<String,Object> hashMap = new HashMap<>();
        hashMap.put("jwt-token", jwt);
        hashMap.put("role",user.getRole());
        return hashMap;
    }

    @PostMapping("/add")
    private ResponseEntity addNewUser(@Validated @RequestBody UsersAddDTO user, BindingResult bindingResult){
        return serviceUser.addNewUser(user,bindingResult);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity errorAuthentication(BadCredentialsException ex) {
        return new ResponseEntity(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

}