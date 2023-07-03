package com.sergiu.kitchenmanager.models.response;

import com.sergiu.kitchenmanager.domain.enums.CookingStatus;
import com.sergiu.kitchenmanager.domain.enums.DeskStatus;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DeskResponseDto {

    private Integer id;

    private Integer number;

    private DeskStatus status;

    private Integer places;

    private CookingStatus cookingStatus;

    private List<OrderItemResponseDto> orderItems;

    private List<ReservationResponseDto> reservations;
}
