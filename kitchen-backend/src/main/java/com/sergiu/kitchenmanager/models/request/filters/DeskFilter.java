package com.sergiu.kitchenmanager.models.request.filters;

import lombok.Data;

@Data
public class DeskFilter {

    private Boolean isEmpty;

    private Boolean isTaken;

    private Boolean isReserved;
}
