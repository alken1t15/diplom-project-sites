package com.example.diplomprojectsite.security;

import com.example.diplomprojectsite.dto.LoginAuth;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryUsers;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDate;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;
    private Logger logger = LoggerFactory.getLogger(JWTFilter.class);
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RepositoryUsers repositoryUser;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth != null) {
            String url = request.getRequestURL().toString();
            if (url.equals("http://localhost:8080/login/jwt")) {
                filterChain.doFilter(request, response);
                return;
            }
            if (headerAuth.startsWith("Bearer ")) {
                String token = headerAuth.substring(7);
                logger.info(String.format("JWT который был получен: %s", token));
                LoginAuth loginAuth = jwtUtil.validateTokenAndRetrieveSubject(token);

                if (loginAuth == null) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Не правильный JWT токен");
                    response.setCharacterEncoding("UTF-8");
                    return;
                }
                String login = loginAuth.getLogin();
                String password = loginAuth.getPassword();
                LocalDate date = loginAuth.getDate();
                logger.info(String.format("Данные полученные из JWT: логин: %s пароль: %s", login, password));
                Authentication authentication = new UsernamePasswordAuthenticationToken(login, password);
                Authentication authenticationUser = authenticationManager.authenticate(authentication);
                if (authenticationUser.isAuthenticated()) {
                    Users user = repositoryUser.findByEmail(login).orElseThrow();
                    if (user.getJwt() == null) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("Не правильный JWT токен");
                        response.setCharacterEncoding("UTF-8");
                        return;
                    }
                    if (!user.getJwt().equals(token)) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("Истек срок JWT токен");
                        response.setCharacterEncoding("UTF-8");
                    } else if (date.isAfter(LocalDate.now())) {
                        SecurityContext securityContext = SecurityContextHolder.getContext();
                        securityContext.setAuthentication(authenticationUser);
                        SecurityContextHolder.setContext(securityContext);
                        filterChain.doFilter(request, response);
                    } else {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("Истек срок JWT токен");
                        response.setCharacterEncoding("UTF-8");
                    }
                } else {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write("Не правильный JWT токен");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().flush();
                    response.getWriter().close();
                }
            }
        }
         else {
            filterChain.doFilter(request, response);
        }
    }
}