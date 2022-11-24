package com.example.Backend.response.error;


import java.util.HashMap;
import java.util.Map;


public class ErrorResponse {


    private ErrorResponse(){}

    public static Map<String , Object> getErrorMap(String message , Integer code){
        Map<String , Object> errorMap = new HashMap<>();
        errorMap.put("message" , message);
        errorMap.put("status_code" , code);
        return errorMap;
    }
}
