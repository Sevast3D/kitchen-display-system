package com.sergiu.kitchenmanager.services.impl;

import com.sergiu.kitchenmanager.domain.entities.DeskEty;
import com.sergiu.kitchenmanager.domain.entities.OrderItemEty;
import com.sergiu.kitchenmanager.domain.entities.PaymentEty;
import com.sergiu.kitchenmanager.domain.enums.CookingStatus;
import com.sergiu.kitchenmanager.domain.enums.DeskStatus;
import com.sergiu.kitchenmanager.domain.repository.DeskRepository;
import com.sergiu.kitchenmanager.domain.repository.PaymentRepository;
import com.sergiu.kitchenmanager.domain.repository.UserRepository;
import com.sergiu.kitchenmanager.exceptions.DeskNotFoundException;
import com.sergiu.kitchenmanager.exceptions.EntityCannotBeDeletedException;
import com.sergiu.kitchenmanager.exceptions.UserNotFoundException;
import com.sergiu.kitchenmanager.mappers.DeskMapper;
import com.sergiu.kitchenmanager.mappers.OrderItemMapper;
import com.sergiu.kitchenmanager.mappers.ProductMapper;
import com.sergiu.kitchenmanager.mappers.ReservationMapper;
import com.sergiu.kitchenmanager.models.request.filters.DeskFilter;
import com.sergiu.kitchenmanager.models.response.DeskResponseDto;
import com.sergiu.kitchenmanager.models.response.OrderItemResponseDto;
import com.sergiu.kitchenmanager.models.response.ReservationResponseDto;
import com.sergiu.kitchenmanager.services.DeskService;
import com.sergiu.kitchenmanager.services.SecurityAccessHandler;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class DeskServiceImpl implements DeskService {

    private final DeskRepository deskRepository;

    private final SecurityAccessHandler securityAccessHandler;

    private final UserRepository userRepository;

    private final PaymentRepository paymentRepository;

    @Override
    public List<DeskResponseDto> getDeskListForDate(LocalDate date) {
        var deskEtyList = deskRepository.findAll();
        List<DeskResponseDto> deskResponseList = new ArrayList<>();
        for (DeskEty desk : deskEtyList) {
            boolean isReservedForGivenDate = desk.getReservations().stream()
                    .anyMatch(reservation -> reservation.getTime().toLocalDate().equals(date));
            var deskResponse = DeskMapper.INSTANCE.deskEtyToDeskResponseDto(desk);
            if (isReservedForGivenDate) {
                deskResponse.setStatus(DeskStatus.RESERVED);
            }

            deskResponseList.add(deskResponse);
        }
        return deskResponseList;
    }

    @Override
    public void createDesk(Integer places) {
        var createdDesk = new DeskEty();
        createdDesk.setStatus(DeskStatus.EMPTY);
        createdDesk.setCookingStatus(CookingStatus.NOT_STARTED);
        createdDesk.setCookingTime(null);
        createdDesk.setPlaces(places);
        createdDesk.setNumber(getDeskNumber());

        deskRepository.save(createdDesk);
    }

    @Override
    public void removeDesk(Integer deskId) {
        var existingDesk = deskRepository.findById(deskId)
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", deskId)));
        if (existingDesk.getStatus() != DeskStatus.EMPTY) {
            throw new EntityCannotBeDeletedException("DeskEty status is not empty");
        }
        deskRepository.deleteById(deskId);
    }

    @Override
    public DeskResponseDto getDeskById(Integer deskId) {
        var requestedDeskEty = deskRepository.findById(deskId)
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", deskId)));
        var response = DeskMapper.INSTANCE.deskEtyToDeskResponseDto(requestedDeskEty);
        var orderItemsList = requestedDeskEty.getOrderItemList().stream()
                .sorted(Comparator.comparing((OrderItemEty item) -> item.getProduct().getCategory())
                        .thenComparing(item -> item.getProduct().getName()))
                .map(item -> {
                    var mappedItem = OrderItemMapper.INSTANCE.mapEtyToResponse(item);
                    var mappedProduct = ProductMapper.INSTANCE.mapProductEtyToDto(item.getProduct());
                    mappedItem.setProduct(mappedProduct);
                    return mappedItem;
                })
                .toList();
        var reservations = requestedDeskEty.getReservations().stream()
                .map(ReservationMapper.INSTANCE::mapReservationEtyToDto)
                .toList();
        var cookingTime = requestedDeskEty.getCookingTime();
        response.setOrderItems(orderItemsList);
        response.setReservations(reservations);
        response.setCookingTime(cookingTime);
        return response;
    }

    //    @Override
//    public List<DeskResponseDto> getDeskList() {
//        return deskRepository.findAll().stream().
//                map(DeskMapper.INSTANCE::deskEtyToDeskResponseDto)
//                .toList();
//    }
    @Override
    public List<DeskResponseDto> getDeskList() {
        List<DeskEty> deskEntities = deskRepository.findAll();
        List<DeskResponseDto> deskResponseDtos = new ArrayList<>();

        for (DeskEty deskEntity : deskEntities) {
            DeskResponseDto deskResponseDto = DeskMapper.INSTANCE.deskEtyToDeskResponseDto(deskEntity);
            List<OrderItemResponseDto> orderItems = deskEntity.getOrderItemList().stream()
                    .map(OrderItemMapper.INSTANCE::mapEtyToResponse)
                    .toList();
            List<ReservationResponseDto> reservations = deskEntity.getReservations().stream()
                    .map(ReservationMapper.INSTANCE::mapReservationEtyToDto)
                    .toList();
            deskResponseDto.setOrderItems(orderItems);
            deskResponseDto.setReservations(reservations);
            deskResponseDtos.add(deskResponseDto);
        }

        return deskResponseDtos;
    }


    @Override
    public List<DeskResponseDto> getFilteredDeskList(DeskFilter filter) {
        if (filter.getIsEmpty() != null) {
            return deskRepository.findAllByStatus(DeskStatus.EMPTY).stream()
                    .map(DeskMapper.INSTANCE::deskEtyToDeskResponseDto)
                    .toList();
        } else if (filter.getIsReserved() != null && filter.getIsTaken() != null) {
            return deskRepository.findAllByStatusOrStatus(DeskStatus.RESERVED, DeskStatus.TAKEN).stream()
                    .map(DeskMapper.INSTANCE::deskEtyToDeskResponseDto)
                    .toList();
        } else {
            throw new IllegalArgumentException("Invalid filter provided");
        }
    }

    @Override
    public void removeOrderList(Integer deskId) {
        var deskEty = deskRepository.findById(deskId)
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", deskId)));
        deskEty.deleteAllOrderItems();
        deskRepository.save(deskEty);
    }

    @Override
    public void payOrder(Integer deskId) {
        var contextUser = userRepository.findUserEtyByEmail(securityAccessHandler.getEmployeeUsernameFromAuthenticationToken())
                .orElseThrow(() -> new UserNotFoundException("User with such email not found"));
        var deskEty = deskRepository.findById(deskId)
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", deskId)));
        var totalSum = getOrderTotalForDesk(deskEty.getOrderItemList());

        var payment = PaymentEty.builder()
                .desk(deskEty)
                .user(contextUser)
                .amount(totalSum)
                .date(LocalDateTime.now())
                .build();
        paymentRepository.save(payment);

        deskEty.deleteAllOrderItems();
        deskEty.setStatus(DeskStatus.CLEAN_UP);
        deskRepository.save(deskEty);
    }

    @Override
    public void updateStatus(Integer deskId, DeskStatus status) {
        var deskEty = deskRepository.findById(deskId)
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", deskId)));
        deskEty.setStatus(status);
        deskRepository.save(deskEty);
    }

    @Override
    public void updateCookingStatus(Integer deskId, CookingStatus cookingStatus) {
        var deskEty = deskRepository.findById(deskId)
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", deskId)));
        deskEty.setCookingStatus(cookingStatus);
        deskRepository.save(deskEty);
    }

    @Override
    public void updateCookingTime(Integer deskId, LocalDateTime cookingTime){
        var deskEty = deskRepository.findById(deskId)
                .orElseThrow(() -> new DeskNotFoundException(String.format("Desk with id:%d not found", deskId)));
        deskEty.setCookingTime(cookingTime);
        deskRepository.save(deskEty);
    }

    private int getDeskNumber() {
        var deskNumberList = deskRepository.findAll().stream()
                .map(DeskEty::getNumber)
                .sorted()
                .toList();
        if (deskNumberList.isEmpty()) {
            return 1;
        }
        int listSize = deskNumberList.size();
        for (int index = 0; index < listSize - 1; index++) {
            if (deskNumberList.get(index + 1) - deskNumberList.get(index) != 1) {
                return deskNumberList.get(index) + 1;
            }
        }

        return deskNumberList.get(listSize - 1) + 1;
    }

    private double getOrderTotalForDesk(List<OrderItemEty> orderItemsList) {
        return orderItemsList.stream()
                .mapToDouble(OrderItemEty::getPrice)
                .sum();
    }
}
