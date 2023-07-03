package com.sergiu.kitchenmanager.controllers;

import com.sergiu.kitchenmanager.models.request.ProductRequestDto;
import com.sergiu.kitchenmanager.models.response.ProductResponseDto;
import com.sergiu.kitchenmanager.services.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProduct(@RequestBody @Valid ProductRequestDto request) {
        productService.createProduct(request);
    }

    @DeleteMapping("/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProduct(@PathVariable Integer productId) {
        productService.deleteProduct(productId);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProducts(){
        var productList = productService.getAllProducts();
        return ResponseEntity.ok(productList);
    }
}
