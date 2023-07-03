package com.sergiu.kitchenmanager.controllers;

import com.sergiu.kitchenmanager.domain.enums.OrderItemStatus;
import com.sergiu.kitchenmanager.models.request.OrderItemRequestDto;
import com.sergiu.kitchenmanager.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addOrderItem(@RequestBody OrderItemRequestDto request){
        orderService.addOrderItem(request);
    }

    @DeleteMapping("/{itemId}")
    @ResponseStatus(HttpStatus.OK)
    public void removeOrderItem(@PathVariable Integer itemId){
        orderService.removeById(itemId);
    }

    @PatchMapping("/{itemId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateStatus(@PathVariable Integer itemId, @RequestParam OrderItemStatus status) {
        orderService.updateStatus(itemId, status);
    }
}
