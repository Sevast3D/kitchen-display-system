package com.sergiu.kitchenmanager.models.response;

import com.sergiu.kitchenmanager.domain.enums.OrderItemStatus;
import lombok.Data;

@Data
public class OrderItemResponseDto {

    private Integer id;

    private OrderItemStatus status;

    private String specification;

    private Integer amount;

    private Double price;

    private ProductResponseDto product;
}
