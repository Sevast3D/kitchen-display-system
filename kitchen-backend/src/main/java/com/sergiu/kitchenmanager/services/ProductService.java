package com.sergiu.kitchenmanager.services;

import com.sergiu.kitchenmanager.models.request.ProductRequestDto;
import com.sergiu.kitchenmanager.models.response.ProductResponseDto;

import java.util.List;

public interface ProductService {

    void createProduct(ProductRequestDto request);

    void deleteProduct(Integer productId);

    List<ProductResponseDto> getAllProducts();
}
