package com.example.diplomprojectsite.service;

import com.example.diplomprojectsite.controller.ControllerProduct;
import com.example.diplomprojectsite.dto.*;
import com.example.diplomprojectsite.entity.*;
import com.example.diplomprojectsite.repository.RepositoryProduct;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class ServiceProduct {
    private final RepositoryProduct repositoryProduct;
    private final ModelMapper modelMapper;
    private final ServiceFavoriteProduct serviceFavoriteProduct;
    private final ServiceCategory serviceCategory;
    private final ServiceUser serviceUser;

    @Autowired
    public ServiceProduct(RepositoryProduct repositoryProduct, ModelMapper modelMapper, ServiceFavoriteProduct serviceFavoriteProduct, ServiceCategory serviceCategory, ServiceUser serviceUser) {
        this.repositoryProduct = repositoryProduct;
        this.modelMapper = modelMapper;
        this.serviceFavoriteProduct = serviceFavoriteProduct;
        this.serviceCategory = serviceCategory;
        this.serviceUser = serviceUser;
    }

    @Value("${path.file}")
    private String pathSave;


    public List<ProductDTO> getAllProduct(List<Product> products) {
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : products) {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            byte[] file = getFile(product.getImg());
            boolean isFavorite = serviceFavoriteProduct.isFavoriteProduct(product.getId());
            productDTO.setImg(file);
            productDTO.setIsFavorite(isFavorite);
            productDTOs.add(productDTO);
        }
        return productDTOs;
    }

    public ProductOneDTO getProductById(Long id) {
        Product product = repositoryProduct.findById(id).orElse(null);
        List<TagDTO> tagDTOs = new ArrayList<>();
        List<Tag> tags = product.getTags();
        for (Tag tag : tags) {
            tagDTOs.add(modelMapper.map(tag, TagDTO.class));
        }
        if (product == null) {
            return null;
        }
        byte[] file = getFile(product.getImg());
        ProductOneDTO productDTO = modelMapper.map(product, ProductOneDTO.class);
        boolean isFavorite = serviceFavoriteProduct.isFavoriteProduct(product.getId());
        productDTO.setImg(file);
        productDTO.setIsFavorite(isFavorite);
        productDTO.setTag(tagDTOs);
        return productDTO;
    }


    public byte[] getFile(String name) {
        byte[] file = new byte[0];
        try {
            file = Files.readAllBytes(Paths.get(pathSave + name));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return file;
    }

    public ResponseEntity addNewProduct(ProductAddDTO productAddDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String nameField = fieldError.getField();
                String errorMessage = fieldError.getDefaultMessage();
                errors.add(String.format("Поле: %s ошибка: %s", nameField, errorMessage));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        String uniqueFileName = System.currentTimeMillis() + productAddDTO.getFile().getOriginalFilename();
        Path path = Paths.get(pathSave, uniqueFileName);
        try {
            productAddDTO.getFile().transferTo(path);
        } catch (IOException e) {
            return new ResponseEntity("Не удалось сохранить файл", HttpStatus.BAD_REQUEST);
        }
        Category category = serviceCategory.getCategoryById(productAddDTO.getId());
        if (category == null) {
            return new ResponseEntity("Нету такой категории", HttpStatus.BAD_REQUEST);
        }
        repositoryProduct.save(new Product(productAddDTO.getName(), productAddDTO.getPrice(), uniqueFileName, productAddDTO.getRating(), productAddDTO.getWeight(), productAddDTO.getDescription(), category,productAddDTO.getComposition()));
        return new ResponseEntity(HttpStatus.OK);
    }

    public Product productById(Long idProduct) {
        return repositoryProduct.getById(idProduct);
    }

    public ServiceFavoriteProduct getServiceFavoriteProduct() {
        return serviceFavoriteProduct;
    }

    public List<ProductDTO> getProductByCategory(Long idCategory) {
        List<Product> products = repositoryProduct.findByCategoryId(idCategory);
        if (products == null) {
            return null;
        }
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : products) {
            byte[] file = getFile(product.getImg());
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            boolean isFavorite = serviceFavoriteProduct.isFavoriteProduct(product.getId());
            productDTO.setImg(file);
            productDTO.setIsFavorite(isFavorite);
            productDTOs.add(productDTO);
        }
        return productDTOs;
    }

    public ResponseEntity getAllFavoriteProduct() {
        Users user = serviceUser.getUser();
        List<FavoriteProduct> favoriteProducts = user.getFavoriteProducts();
        if (favoriteProducts.isEmpty()) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (FavoriteProduct f : favoriteProducts) {
                Product product = f.getProduct();
                ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                byte[] file = getFile(product.getImg());
                boolean isFavorite = serviceFavoriteProduct.isFavoriteProduct(product.getId());
                productDTO.setImg(file);
                productDTO.setIsFavorite(isFavorite);
                productDTOs.add(productDTO);
            }
            return new ResponseEntity(productDTOs, HttpStatus.OK);
        }
    }

    public ResponseEntity getAllProductAndCategory(Long idCategory, String name) {
        Users user = serviceUser.getUser();
        List<CategoryDTO> categories = serviceCategory.getAllCategory();
        List<ProductDTO> products;
        List<ProductDTO> productsTwo;
        if (idCategory!=null && name !=null){
            String nameUpp;
            if (name.length()>1) {
                nameUpp=name.substring(0,1).toUpperCase();
            }
            else {
                nameUpp=name.toUpperCase();
            }
            products = getAllProduct(repositoryProduct.findByNameAndIdCategory(name,idCategory));
            productsTwo = getAllProduct(repositoryProduct.findByNameLikeIgnoreCaseAndIdCategory(nameUpp,idCategory));
            Set<ProductDTO> set = new HashSet<>(products);
            set.addAll(productsTwo);
            products.clear();
            products.addAll(set);
        }
        else if(name != null){
            String nameUpp;
        if (name.length()>1) {
             nameUpp=name.substring(0,1).toUpperCase();
        }
        else {
            nameUpp=name.toUpperCase();
        }
            products = getAllProduct(repositoryProduct.findByNameIsLikeIgnoreCase(name));
            productsTwo = getAllProduct(repositoryProduct.findByNameLikeIgnoreCase(nameUpp));
            Set<ProductDTO> set = new HashSet<>(products);
            set.addAll(productsTwo);
            products.clear();
            products.addAll(set);
        }
        else if (idCategory != null){
            products = getProductByCategory(idCategory);
        }
        else {
            products = getAllProduct(repositoryProduct.findAll());
        }
        return new ResponseEntity(new ControllerProduct.ProductMainDTO(categories, products, user.getBonus(),user.getOrders().size()),HttpStatus.OK);
    }
}