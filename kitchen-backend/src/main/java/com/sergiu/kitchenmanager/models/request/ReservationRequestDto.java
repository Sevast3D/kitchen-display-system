package com.sergiu.kitchenmanager.models.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationRequestDto {

    private String eventDescription;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateTime;

    private Integer people;

    private Integer deskId;
}
