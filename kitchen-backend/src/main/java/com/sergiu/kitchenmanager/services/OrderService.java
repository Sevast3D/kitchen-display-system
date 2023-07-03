package com.sergiu.kitchenmanager.services;

import com.sergiu.kitchenmanager.domain.enums.OrderItemStatus;
import com.sergiu.kitchenmanager.models.request.OrderItemRequestDto;

public interface OrderService {

    void addOrderItem(OrderItemRequestDto request);

    void removeById(Integer itemId);

    void updateStatus(Integer itemId, OrderItemStatus status);
}
