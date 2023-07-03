package com.sergiu.kitchenmanager.services.impl;

import com.sergiu.kitchenmanager.domain.entities.ReservationEty;
import com.sergiu.kitchenmanager.domain.repository.DeskRepository;
import com.sergiu.kitchenmanager.domain.repository.ReservationRepository;
import com.sergiu.kitchenmanager.domain.repository.UserRepository;
import com.sergiu.kitchenmanager.exceptions.DeskNotFoundException;
import com.sergiu.kitchenmanager.exceptions.UserNotFoundException;
import com.sergiu.kitchenmanager.mappers.DeskMapper;
import com.sergiu.kitchenmanager.models.request.AvailableDeskRequest;
import com.sergiu.kitchenmanager.models.request.ReservationRequestDto;
import com.sergiu.kitchenmanager.models.response.DeskResponseDto;
import com.sergiu.kitchenmanager.services.ReservationService;
import com.sergiu.kitchenmanager.services.SecurityAccessHandler;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;

    private final DeskRepository deskRepository;

    private final UserRepository userRepository;

    private final SecurityAccessHandler securityAccessHandler;

    @Override
    public List<DeskResponseDto> getAvailableDesks(AvailableDeskRequest request) {
        LocalDateTime startDateTime = request.getDateTime().minusHours(2);
        LocalDateTime endOfDay = request.getDateTime().with(LocalTime.MAX);

        return deskRepository.findAllByPlacesGreaterThanEqual(request.getPeople()).stream()
                .filter(desk -> desk.getReservations().stream()
                        .noneMatch(reservation -> {
                            LocalDateTime reservationTime = reservation.getTime();
                            return reservationTime.isAfter(startDateTime) && reservationTime.isBefore(endOfDay);
                        }))
                .map(DeskMapper.INSTANCE::deskEtyToDeskResponseDto)
                .toList();
    }

    @Override
    public void createReservation(ReservationRequestDto request) {
        var userEty = userRepository.findUserEtyByEmail(securityAccessHandler.getEmployeeUsernameFromAuthenticationToken())
                .orElseThrow(() -> new UserNotFoundException("Context user not found!"));
        var deskEty = deskRepository.findById(request.getDeskId())
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", request.getDeskId())));

        var reservationEty = ReservationEty.builder()
                .user(userEty)
                .desk(deskEty)
                .places(request.getPeople())
                .time(request.getDateTime())
                .eventDescription(request.getEventDescription())
                .build();

        reservationRepository.save(reservationEty);
    }

    @Override
    public void deleteById(Integer reservationId) {
        reservationRepository.deleteById(reservationId);
    }
}
