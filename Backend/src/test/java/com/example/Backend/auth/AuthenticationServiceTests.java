package com.example.Backend.auth;


import com.example.Backend.entity.User;
import com.example.Backend.exception.ArgumentException;
import com.example.Backend.exception.DuplicateEntryException;
import com.example.Backend.exception.utils.ExceptionMessages;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

@DataJpaTest
class AuthenticationServiceTests {
    @InjectMocks
    UserService userService;
    @Mock
    UserRepository userRepository;

    @Mock
    ExceptionMessages exceptionMessages;
    User user;
    @BeforeEach
    void setUp(){
        user = new User();
        user.setPicture("http://locahost:4000/picture");
        user.setUsername("Manas");
        user.setEmail("manas.kalangan@gmail.com");
        user.setUId("ukaMnjdcJnkfjyurfllLLldfn");
    }

    @Test
    void testRegisteredUser(){
        Mockito.when(userRepository.save(user)).thenReturn(user);
        userService.registerUser(user);

        Mockito.verify(userRepository , Mockito.times(1)).save(user);
    }

    @Test
    void throwIllegalArgumentException(){

        Mockito.when(userRepository.save(user)).thenThrow(IllegalArgumentException.class);
        Mockito.when(exceptionMessages.getARGUMENT_EXCEPTION()).thenReturn("Argument Exception");

        Assertions.assertThrows(ArgumentException.class , () -> userService.registerUser(user));
    }

    @Test
    void throwDataIntegrityViolation(){
        Mockito.when(userRepository.save(user)).thenThrow(DataIntegrityViolationException.class);
        Mockito.when(exceptionMessages.getDUPLICATE_ENTRY_ERROR()).thenReturn("Duplicate Entry Error");
        Assertions.assertThrows(DuplicateEntryException.class , ()-> userService.registerUser(user));
    }
}
