package com.sergiu.kitchenmanager.mappers;

import com.sergiu.kitchenmanager.domain.entities.OrderItemEty;
import com.sergiu.kitchenmanager.models.request.OrderItemRequestDto;
import com.sergiu.kitchenmanager.models.response.OrderItemResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderItemMapper {

    OrderItemMapper INSTANCE = Mappers.getMapper(OrderItemMapper.class);

    OrderItemEty mapDtoToOrderItemEty(OrderItemRequestDto request);

    OrderItemResponseDto mapEtyToResponse(OrderItemEty entity);
}
