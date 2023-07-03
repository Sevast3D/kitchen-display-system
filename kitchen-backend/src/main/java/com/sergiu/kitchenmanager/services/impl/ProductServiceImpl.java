package com.sergiu.kitchenmanager.services.impl;

import com.sergiu.kitchenmanager.domain.repository.ProductRepository;
import com.sergiu.kitchenmanager.mappers.ProductMapper;
import com.sergiu.kitchenmanager.models.request.ProductRequestDto;
import com.sergiu.kitchenmanager.models.response.ProductResponseDto;
import com.sergiu.kitchenmanager.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public void createProduct(ProductRequestDto request) {
        var productEty = ProductMapper.INSTANCE.mapProductDtoToEntity(request);
        productRepository.save(productEty);
    }

    @Override
    public void deleteProduct(Integer productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public List<ProductResponseDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductMapper.INSTANCE::mapProductEtyToDto)
                .toList();
    }
}
