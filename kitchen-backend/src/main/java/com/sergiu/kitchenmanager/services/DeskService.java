package com.sergiu.kitchenmanager.services;

import com.sergiu.kitchenmanager.domain.enums.CookingStatus;
import com.sergiu.kitchenmanager.domain.enums.DeskStatus;
import com.sergiu.kitchenmanager.models.request.filters.DeskFilter;
import com.sergiu.kitchenmanager.models.response.DeskResponseDto;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface DeskService {

    List<DeskResponseDto> getDeskListForDate(LocalDate date);

    void createDesk(Integer places);

    void removeDesk(Integer deskId);

    DeskResponseDto getDeskById(Integer deskId);

    List<DeskResponseDto> getDeskList();

    List<DeskResponseDto> getFilteredDeskList(DeskFilter filter);

    void removeOrderList(Integer deskId);

    void payOrder(Integer deskId);

    void updateStatus(Integer deskId, DeskStatus status);

    void updateCookingStatus(Integer deskId, CookingStatus cookingStatus);

    void updateCookingTime(Integer deskId, LocalDateTime cookingTime);

}
