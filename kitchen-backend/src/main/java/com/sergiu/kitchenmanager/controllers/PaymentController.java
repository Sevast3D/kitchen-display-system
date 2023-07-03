package com.sergiu.kitchenmanager.controllers;

import com.sergiu.kitchenmanager.models.response.PaymentResponseDto;
import com.sergiu.kitchenmanager.services.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("payments")
@AllArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> getAll() {
        var responseList = paymentService.getAllPayments();
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/{deskId}")
    public ResponseEntity<List<PaymentResponseDto>> getByDeskId(@PathVariable Integer deskId){
        var responseList = paymentService.getByDeskId(deskId);
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/dates")
    public ResponseEntity<List<PaymentResponseDto>> getByDate(@RequestParam LocalDate date){
        var responseList = paymentService.getByDate(date);
        return ResponseEntity.ok(responseList);
    }
}
