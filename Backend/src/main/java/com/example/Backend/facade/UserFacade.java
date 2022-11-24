package com.example.Backend.facade;


import com.example.Backend.dto.UserDTO;
import com.example.Backend.mapper.UserMapper;
import com.example.Backend.service.UserService;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class UserFacade {
    private final UserMapper userMapper;
    private final UserService userService;

    public void registerUser(FirebaseToken firebaseToken){
        log.info("UserFacade {}" , firebaseToken.getEmail());
        userService.registerUser(userMapper.firebaseTokenToEntity(firebaseToken));
    }


}
