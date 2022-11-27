package com.example.Backend.facade;

import com.example.Backend.entity.User;
import com.example.Backend.mapper.UserMapper;
import com.example.Backend.service.UserService;
import com.example.Backend.utils.ExtractUserFromToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

@RequiredArgsConstructor
@Component
@Slf4j
public class UserFacade {
    private final UserMapper userMapper;
    private final UserService userService;
    private final ExtractUserFromToken extractUserFromToken;

    public void registerUser(Map<String , Object> mapJwtToken){
        User user = extractUserFromToken.getUser(mapJwtToken);
        log.info("UserFacade {}" , user.getEmail());
        userService.registerUser(user);
    }


}
