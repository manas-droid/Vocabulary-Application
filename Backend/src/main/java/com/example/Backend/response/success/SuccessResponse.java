package com.example.Backend.response.success;


import java.util.HashMap;
import java.util.Map;

public class SuccessResponse {

    private SuccessResponse(){}

    public static Map<String , Object> result(String message , Integer code , Object data){
        Map<String , Object> successMap = new HashMap<>();

        successMap.put("message" , message);
        successMap.put("status_code" , code);

        if(data!=null) successMap.put("data" , data);

        return successMap;
    }
}

/*
{
    message: String,
    status_code: Integer
    data : Object
}

 */
