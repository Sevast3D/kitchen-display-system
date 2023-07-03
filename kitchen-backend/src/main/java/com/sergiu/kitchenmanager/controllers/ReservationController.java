package com.sergiu.kitchenmanager.controllers;

import com.sergiu.kitchenmanager.models.request.AvailableDeskRequest;
import com.sergiu.kitchenmanager.models.request.ReservationRequestDto;
import com.sergiu.kitchenmanager.models.response.DeskResponseDto;
import com.sergiu.kitchenmanager.services.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("reservations")
@AllArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/desks")
    public ResponseEntity<List<DeskResponseDto>> getAvailableDesks(@RequestBody AvailableDeskRequest request){
        var responseList = reservationService.getAvailableDesks(request);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createReservation(@RequestBody ReservationRequestDto request){
        reservationService.createReservation(request);
    }

    @DeleteMapping("/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable Integer reservationId){
        reservationService.deleteById(reservationId);
    }
}
