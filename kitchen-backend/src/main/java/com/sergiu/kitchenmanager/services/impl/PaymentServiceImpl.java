package com.sergiu.kitchenmanager.services.impl;

import com.sergiu.kitchenmanager.domain.entities.PaymentEty;
import com.sergiu.kitchenmanager.domain.repository.PaymentRepository;
import com.sergiu.kitchenmanager.models.response.PaymentResponseDto;
import com.sergiu.kitchenmanager.services.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public List<PaymentResponseDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::mapEtyToResponseDto)
                .toList();
    }

    @Override
    public List<PaymentResponseDto> getByDeskId(Integer deskId) {
        return paymentRepository.findAllByDeskId(deskId).stream()
                .map(this::mapEtyToResponseDto)
                .toList();
    }

    @Override
    public List<PaymentResponseDto> getByDate(LocalDate date) {
        return paymentRepository.findAll().stream()
                .filter(payment -> payment.getDate().toLocalDate().equals(date))
                .map(this::mapEtyToResponseDto)
                .toList();
    }


    private PaymentResponseDto mapEtyToResponseDto(PaymentEty entity) {
        return PaymentResponseDto.builder()
                .id(entity.getId())
                .amount(entity.getAmount())
                .deskId(entity.getDesk().getId())
                .date(entity.getDate())
                .build();
    }
}
