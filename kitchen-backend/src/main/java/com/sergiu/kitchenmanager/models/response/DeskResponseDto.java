package com.sergiu.kitchenmanager.models.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sergiu.kitchenmanager.domain.enums.CookingStatus;
import com.sergiu.kitchenmanager.domain.enums.DeskStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class DeskResponseDto {

    private Integer id;

    private Integer number;

    private DeskStatus status;

    private Integer places;

    private CookingStatus cookingStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime cookingTime;
    private List<OrderItemResponseDto> orderItems;

    private List<ReservationResponseDto> reservations;
}
