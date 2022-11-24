package com.example.Backend.mapper;

public interface Mapper<DTO , Entity> {
    Entity dtoToEntity(DTO dto);
    DTO entityToDto(Entity entity);
}
