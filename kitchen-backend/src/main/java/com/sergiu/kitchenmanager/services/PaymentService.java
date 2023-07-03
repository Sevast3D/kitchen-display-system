package com.sergiu.kitchenmanager.services;

import com.sergiu.kitchenmanager.models.response.PaymentResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface PaymentService {

    List<PaymentResponseDto> getAllPayments();

    List<PaymentResponseDto> getByDeskId(Integer deskId);

    List<PaymentResponseDto> getByDate(LocalDate date);
}
