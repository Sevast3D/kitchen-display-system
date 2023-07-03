package com.sergiu.kitchenmanager.models.request;

import lombok.Data;

@Data
public class OrderItemRequestDto {

    private Integer productId;

    private String specification;

    private Integer amount;

    private Integer deskId;
}
