package com.example.Backend.security;


import com.google.firebase.auth.FirebaseAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityService {

    private final FirebaseAuth auth;

    public String getAuthToken(String authorization){
        if(authorization!=null && authorization.startsWith("Bearer ")){
            String[] split = authorization.split(" ");
            if(split.length != 2) return null;
           return split[1];
        }
        return null;
    }

}
