package com.example.Backend.controller;

import com.example.Backend.facade.UserFacade;
import com.example.Backend.response.success.SuccessResponse;
import com.example.Backend.security.SecurityService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
//@CrossOrigin(value = "http://localhost:4200", allowedHeaders = "Authorization", maxAge = 3600L ,
//        methods = {RequestMethod.GET ,  RequestMethod.POST , RequestMethod.OPTIONS , RequestMethod.HEAD})

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserFacade userFacade;
    private final FirebaseAuth auth;
    private final SecurityService securityService;

    @PostMapping("")
    public ResponseEntity<Map<String , Object>> registerUser(HttpServletRequest request) throws FirebaseAuthException {
        String authorization = securityService.getAuthToken(request.getHeader("Authorization"));
        FirebaseToken firebaseToken = auth.verifyIdToken(authorization);
        log.info("Register User : {}", firebaseToken.getUid());

        userFacade.registerUser(firebaseToken);

        return new ResponseEntity<>(SuccessResponse.result("User Created Successfully" , HttpStatus.CREATED.value(), null) , HttpStatus.CREATED);
    }

}
