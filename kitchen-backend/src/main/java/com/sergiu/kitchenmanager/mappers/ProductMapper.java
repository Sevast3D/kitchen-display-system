package com.sergiu.kitchenmanager.mappers;

import com.sergiu.kitchenmanager.domain.entities.ProductEty;
import com.sergiu.kitchenmanager.models.request.ProductRequestDto;
import com.sergiu.kitchenmanager.models.response.ProductResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    ProductEty mapProductDtoToEntity(ProductRequestDto requestDto);

    ProductResponseDto mapProductEtyToDto(ProductEty productEty);
}
