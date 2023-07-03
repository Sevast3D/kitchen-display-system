package com.sergiu.kitchenmanager.services;

import com.sergiu.kitchenmanager.models.request.AvailableDeskRequest;
import com.sergiu.kitchenmanager.models.request.ReservationRequestDto;
import com.sergiu.kitchenmanager.models.response.DeskResponseDto;

import java.util.List;

public interface ReservationService {

    List<DeskResponseDto> getAvailableDesks(AvailableDeskRequest request);

    void createReservation(ReservationRequestDto request);

    void deleteById(Integer reservationId);
}
