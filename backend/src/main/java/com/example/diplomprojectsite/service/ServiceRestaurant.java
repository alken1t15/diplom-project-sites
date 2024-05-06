package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.RestaurantAddDTO;
import com.example.diplomprojectsite.dto.RestaurantDTO;
import com.example.diplomprojectsite.entity.Restaurant;
import com.example.diplomprojectsite.repository.RepositoryRestaurant;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceRestaurant {
    private final RepositoryRestaurant repositoryRestaurant;
    private final ModelMapper modelMapper;

    @Autowired
    public ServiceRestaurant(RepositoryRestaurant repositoryRestaurant, ModelMapper modelMapper) {
        this.repositoryRestaurant = repositoryRestaurant;
        this.modelMapper = modelMapper;
    }

    @Value("${path.file}")
    private String pathSave;


    public ResponseEntity getAllRestaurant() {
        List<Restaurant> restaurants = repositoryRestaurant.findAll();
        List<RestaurantDTO> restaurantDTOs = new ArrayList<>();
        for (Restaurant r : restaurants) {
            RestaurantDTO restaurantDTO = modelMapper.map(r, RestaurantDTO.class);
            byte[] file = new byte[0];
            try {
                file = Files.readAllBytes(Paths.get(pathSave + r.getImg()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            restaurantDTO.setImg(file);
            restaurantDTOs.add(restaurantDTO);
        }
        return new ResponseEntity(restaurantDTOs, HttpStatus.OK);
    }

    public ResponseEntity addNewRestaurant(RestaurantAddDTO restaurant, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        String uniqNameFile = System.currentTimeMillis() + restaurant.getFile().getOriginalFilename();
        Path path = Paths.get(uniqNameFile);
        try {
            restaurant.getFile().transferTo(path);
            repositoryRestaurant.save(new Restaurant(restaurant.getPlace(), restaurant.getDateStart(), restaurant.getDateEnd(), restaurant.getPhone(), uniqNameFile));
        } catch (IOException e) {
            return new ResponseEntity("Не удалось сохранить файл", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}