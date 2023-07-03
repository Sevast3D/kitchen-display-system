package com.sergiu.kitchenmanager.models.response;

import com.sergiu.kitchenmanager.domain.enums.ProductCategory;
import lombok.Data;

@Data
public class ProductResponseDto {

    private Integer id;

    private String name;

    private Double price;

    private String image;

    private String components;

    private ProductCategory category;

}
