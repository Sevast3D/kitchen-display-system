package com.sergiu.kitchenmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class OrderItemNotFoundException extends RuntimeException {

    public OrderItemNotFoundException(String msg) {
        super(msg);
    }
}
