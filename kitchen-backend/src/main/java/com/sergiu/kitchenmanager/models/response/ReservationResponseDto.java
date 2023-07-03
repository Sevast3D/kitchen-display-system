package com.sergiu.kitchenmanager.models.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReservationResponseDto {

    private Integer id;

    private String userId;

    private Integer places;

    private String eventDescription;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime time;

}
