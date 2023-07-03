package com.sergiu.kitchenmanager.domain.entities;

import com.sergiu.kitchenmanager.domain.enums.ProductCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class ProductEty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer id;

    @Column(name = "product_name")
    private String name;

    @Column(name = "product_price")
    private Double price;

    @Column(name = "product_image")
    private String image;

    @Column(name = "product_components")
    private String components;

    @Column(name = "product_category")
    private ProductCategory category;
}
