package com.example.Backend.mapper;

import com.example.Backend.dto.UserDTO;
import com.example.Backend.entity.User;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Component;


@Component
public class UserMapper implements Mapper<UserDTO , User>{

    @Override
    public User dtoToEntity(UserDTO userDTO) {
        User user = new User();

        user.setEmail(userDTO.getEmail());
        user.setPicture(userDTO.getPicture());
        user.setUsername(userDTO.getUsername());
        user.setUId(userDTO.getUId());

        return user;
    }

    @Override
    public UserDTO entityToDto(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setEmail(user.getEmail());
        userDTO.setPicture(user.getPicture());
        userDTO.setUsername(user.getUsername());
        userDTO.setUId(user.getUId());

        return userDTO;
    }


    public User firebaseTokenToEntity(FirebaseToken firebaseToken){
        User user = new User();

        user.setPicture(firebaseToken.getPicture());
        user.setUsername(firebaseToken.getName());
        user.setUId(firebaseToken.getUid());
        user.setEmail(firebaseToken.getEmail());

        return user;
    }
}
