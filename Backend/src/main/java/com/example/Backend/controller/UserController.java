package com.example.Backend.controller;

import com.example.Backend.facade.UserFacade;
import com.example.Backend.response.success.SuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserFacade userFacade;

    @PostMapping("")
    public ResponseEntity<Map<String , Object>> registerUser(JwtAuthenticationToken jwtAuthToken)  {
        userFacade.registerUser(jwtAuthToken.getTokenAttributes());
        return new ResponseEntity<>(SuccessResponse.result("User Created Successfully" , HttpStatus.CREATED.value(), null) , HttpStatus.CREATED);
    }


}
