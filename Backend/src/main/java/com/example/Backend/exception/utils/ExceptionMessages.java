package com.example.Backend.exception.utils;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource("classpath:application.constants.properties")
@Component
@Getter
public class ExceptionMessages {
    @Value("${ARGUMENT_EXCEPTION}")
    public String ARGUMENT_EXCEPTION;

    @Value("${AUTHORIZATION_ERROR}")
    public String AUTHORIZATION_ERROR;

    @Value("${INTERNAL_SERVER_ERROR}")
    public String INTERNAL_SERVER_ERROR;

    @Value("${DUPLICATE_ENTRY_ERROR}")
    public String DUPLICATE_ENTRY_ERROR;
}
