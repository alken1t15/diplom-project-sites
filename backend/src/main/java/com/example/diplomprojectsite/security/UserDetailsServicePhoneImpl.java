package com.example.diplomprojectsite.security;

import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryUsers;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class UserDetailsServicePhoneImpl implements UserDetailsService {

    private RepositoryUsers repositoryUser;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        Users user = repositoryUser.findByPhone(phone).orElse(null);
        return new UserDetailsPhoneImp(user);
    }
}