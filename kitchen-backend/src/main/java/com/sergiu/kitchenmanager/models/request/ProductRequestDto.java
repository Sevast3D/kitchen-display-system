package com.sergiu.kitchenmanager.models.request;

import com.sergiu.kitchenmanager.domain.enums.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductRequestDto {

    @NotBlank
    private String name;

    private Double price;

    @NotBlank
    private String image;

    @NotBlank
    private String components;

    private ProductCategory category;
}
