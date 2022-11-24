package com.example.Backend.security;

import com.example.Backend.dto.UserDTO;
import com.example.Backend.exception.utils.ExceptionMessages;
import com.example.Backend.response.error.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Iterator;

@Slf4j
@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {
    private  final FirebaseAuth auth;
    private final  ObjectMapper objectMapper;
    private final SecurityService securityService;
    private final ExceptionMessages exceptionMessages;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException {
        response.setHeader("Content-Type" , "application/json");
        log.info("Request Method: {}" , request.getMethod());
        log.info("Origin : {}" , request.getHeader("Origin"));
        String authorization = securityService.getAuthToken(request.getHeader("Authorization"));
        if(authorization!=null){
            log.info("Unverified Id Token {}", authorization);
            try {
                FirebaseToken token = auth.verifyIdToken(authorization);
                log.info("VERIFIED Id Token {}" , token.getUid());
                filterChain.doFilter(request, response);
            } catch (FirebaseAuthException e) {
                log.error("Security Filter : Firebase Id Token Exception {}", e.getLocalizedMessage());
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                objectMapper.writeValue(response.getWriter(), ErrorResponse.getErrorMap(exceptionMessages.AUTHORIZATION_ERROR, response.getStatus()));
            } catch (IOException | ServletException e) {
                log.error("Security Filter : Internal Server Error {}", e.getLocalizedMessage());
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
                objectMapper.writeValue(response.getWriter(), ErrorResponse.getErrorMap(exceptionMessages.INTERNAL_SERVER_ERROR, response.getStatus()));
            }
        }
      else{
            log.error("Security Filter : Token Error");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            objectMapper.writeValue(response.getWriter(), ErrorResponse.getErrorMap(exceptionMessages.AUTHORIZATION_ERROR, response.getStatus()));
        }
    }

}
