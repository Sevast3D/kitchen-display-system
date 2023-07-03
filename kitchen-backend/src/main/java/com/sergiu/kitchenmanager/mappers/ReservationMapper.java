package com.sergiu.kitchenmanager.mappers;

import com.sergiu.kitchenmanager.domain.entities.ReservationEty;
import com.sergiu.kitchenmanager.models.response.ReservationResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReservationMapper {

    ReservationMapper INSTANCE = Mappers.getMapper(ReservationMapper.class);

    @Mapping(target = "userId", source = "entity.user.userId")
    ReservationResponseDto mapReservationEtyToDto(ReservationEty entity);
}
