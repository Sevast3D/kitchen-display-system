package com.sergiu.kitchenmanager.controllers;

import com.sergiu.kitchenmanager.domain.enums.CookingStatus;
import com.sergiu.kitchenmanager.domain.enums.DeskStatus;
import com.sergiu.kitchenmanager.models.request.filters.DeskFilter;
import com.sergiu.kitchenmanager.models.response.DeskResponseDto;
import com.sergiu.kitchenmanager.services.DeskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/desks")
public class DeskController {

    private final DeskService deskService;

    @GetMapping("/dates")
    public ResponseEntity<List<DeskResponseDto>> getDeskListForDate(@RequestParam LocalDate date) {
        var deskList = deskService.getDeskListForDate(date);
        return ResponseEntity.ok(deskList);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createDesk(@RequestParam Integer places) {
        deskService.createDesk(places);
    }

    @DeleteMapping("/{deskId}")
    @ResponseStatus(HttpStatus.OK)
    public void removeDesk(@PathVariable Integer deskId) {
        deskService.removeDesk(deskId);
    }

    @GetMapping("/{deskId}")
    public ResponseEntity<DeskResponseDto> getDeskById(@PathVariable Integer deskId) {
        var requestedDesk = deskService.getDeskById(deskId);
        return ResponseEntity.ok(requestedDesk);
    }

    @GetMapping
    public ResponseEntity<List<DeskResponseDto>> getDeskList() {
        var deskList = deskService.getDeskList();
        return ResponseEntity.ok(deskList);
    }

    @GetMapping("/filters")
    public ResponseEntity<List<DeskResponseDto>> getFilteredDeskList(@RequestBody DeskFilter filter) {
        var deskList = deskService.getFilteredDeskList(filter);
        return ResponseEntity.ok(deskList);
    }

    @DeleteMapping("/{deskId}/orders")
    @ResponseStatus(HttpStatus.OK)
    public void removeOrderList(@PathVariable Integer deskId) {
        deskService.removeOrderList(deskId);
    }

    @PostMapping("/{deskId}/payments")
    @ResponseStatus(HttpStatus.CREATED)
    public void payOrder(@PathVariable Integer deskId) {
        deskService.payOrder(deskId);
    }

    @PatchMapping("/{deskId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateDeskStatus(@PathVariable Integer deskId,
                                 @RequestParam(required = false) DeskStatus status,
                                 @RequestParam(required = false)  CookingStatus cookingStatus) {

        if (status != null) {
            deskService.updateStatus(deskId, status);
        }
        if (cookingStatus != null) {
            deskService.updateCookingStatus(deskId, cookingStatus);
        }
    }

}
