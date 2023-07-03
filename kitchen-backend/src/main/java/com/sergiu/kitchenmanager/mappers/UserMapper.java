package com.sergiu.kitchenmanager.mappers;

import com.sergiu.kitchenmanager.domain.entities.UserEty;
import com.sergiu.kitchenmanager.models.response.AuthResponseDto;
import com.sergiu.kitchenmanager.models.response.UserResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponseDto userEtyToUserResponseDto(UserEty userEty);

    AuthResponseDto userEtyToAuthResponseDto(UserEty userEty);
}
