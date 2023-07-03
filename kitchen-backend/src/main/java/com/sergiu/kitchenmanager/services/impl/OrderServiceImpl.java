package com.sergiu.kitchenmanager.services.impl;

import com.sergiu.kitchenmanager.domain.enums.OrderItemStatus;
import com.sergiu.kitchenmanager.domain.repository.DeskRepository;
import com.sergiu.kitchenmanager.domain.repository.OrderRepository;
import com.sergiu.kitchenmanager.domain.repository.ProductRepository;
import com.sergiu.kitchenmanager.exceptions.OrderItemNotFoundException;
import com.sergiu.kitchenmanager.mappers.OrderItemMapper;
import com.sergiu.kitchenmanager.models.request.OrderItemRequestDto;
import com.sergiu.kitchenmanager.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final DeskRepository deskRepository;

    private final ProductRepository productRepository;

    @Override
    public void addOrderItem(OrderItemRequestDto request) {
        var deskEty = deskRepository.findById(request.getDeskId());
        var productEty = productRepository.findById(request.getProductId());
        if (deskEty.isEmpty() || productEty.isEmpty()) {
            throw new IllegalArgumentException("Desk id or Product id does not exist");
        }

        var orderItem = OrderItemMapper.INSTANCE.mapDtoToOrderItemEty(request);
        orderItem.setDesk(deskEty.get());
        orderItem.setProduct(productEty.get());
        orderItem.setStatus(OrderItemStatus.NOT_COOKED);
        orderItem.setPrice(productEty.get().getPrice() * request.getAmount());

        orderRepository.save(orderItem);
    }

    @Override
    public void removeById(Integer itemId) {
        var orderEty = orderRepository.findById(itemId)
                .orElseThrow(() -> new OrderItemNotFoundException(String.format("Order item with id:%d not found", itemId)));

        if (orderEty.getStatus() == OrderItemStatus.COOKED) {
            throw new IllegalArgumentException("Order item with status COOKED can't be deleted");
        }

        orderRepository.delete(orderEty);
    }

    @Override
    public void updateStatus(Integer itemId, OrderItemStatus status) {
        var orderEty = orderRepository.findById(itemId)
                .orElseThrow(() -> new OrderItemNotFoundException(String.format("Order item with id:%d not found", itemId)));

        orderEty.setStatus(status);
        orderRepository.save(orderEty);
    }
}
