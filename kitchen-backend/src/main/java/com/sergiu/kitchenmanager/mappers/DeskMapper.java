package com.sergiu.kitchenmanager.mappers;

import com.sergiu.kitchenmanager.domain.entities.DeskEty;
import com.sergiu.kitchenmanager.models.response.DeskResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeskMapper {

    DeskMapper INSTANCE = Mappers.getMapper(DeskMapper.class);
    DeskResponseDto deskEtyToDeskResponseDto(DeskEty ety);
}
