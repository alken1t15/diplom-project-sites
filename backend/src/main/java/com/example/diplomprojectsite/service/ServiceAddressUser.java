package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.AddressUserAddDTO;
import com.example.diplomprojectsite.dto.AddressUserDTO;
import com.example.diplomprojectsite.entity.AddressUser;
import com.example.diplomprojectsite.entity.Users;
import com.example.diplomprojectsite.repository.RepositoryAddressUser;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceAddressUser {

    private final RepositoryAddressUser repositoryAddressUser;
    private final ServiceUser serviceUser;
    private final ModelMapper modelMapper;

    public ResponseEntity getAllAddressUser() {
        Users users = serviceUser.getUser();
        List<AddressUser> addressUsers = repositoryAddressUser.findByUserId(users.getId());
        List<AddressUserDTO> addressUserDTOs = new ArrayList<>();
        for (AddressUser a : addressUsers){
            addressUserDTOs.add(modelMapper.map(a,AddressUserDTO.class));
        }
        return new ResponseEntity(addressUserDTOs, HttpStatus.OK);
    }

    public ResponseEntity addNewAddress(AddressUserAddDTO addressUser, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Users user = serviceUser.getUser();
        if (addressUser.getComment() != null) {
            repositoryAddressUser.save(new AddressUser(addressUser.getStreet(), addressUser.getEntrance(), addressUser.getNumber(), addressUser.getFloor(), addressUser.getFlat(), addressUser.getComment(), user));
        }
        else {
            repositoryAddressUser.save(new AddressUser(addressUser.getStreet(), addressUser.getEntrance(), addressUser.getNumber(), addressUser.getFloor(), addressUser.getFlat(), user));
        }
        return new ResponseEntity( HttpStatus.OK);
    }

    public AddressUser getById(Long idAddress) {
        return repositoryAddressUser.findById(idAddress).orElseThrow();
    }
}