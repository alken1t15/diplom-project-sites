package com.example.diplomprojectsite.repository;

import com.example.diplomprojectsite.entity.AddressUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryAddressUser extends JpaRepository<AddressUser,Long> {

    @Query("select a from AddressUser a where a.user.id = ?1")
    List<AddressUser> findByUserId(Long id);
}