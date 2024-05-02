package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.dto.CategoryDTO;
import com.example.diplomprojectsite.entity.Category;
import com.example.diplomprojectsite.repository.RepositoryCategory;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceCategory {
    private final RepositoryCategory repositoryCategory;
    private final ModelMapper modelMapper;


    public List<CategoryDTO> getAllCategory() {
        List<CategoryDTO> categoryDTOs = new ArrayList<>();
        List<Category> categories = repositoryCategory.findAll();
        for (Category category : categories){
            CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
            categoryDTOs.add(categoryDTO);
        }
        return categoryDTOs;
    }

    public Category getCategoryById(Long id){
        return repositoryCategory.getById(id);
    }
}
