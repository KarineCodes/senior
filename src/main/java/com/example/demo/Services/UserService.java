package com.example.demo.Services;

import com.example.demo.dtos.LoginDto;
import com.example.demo.dtos.UserDto;
// import com.example.Registation.payload.response.LoginMesage;
import com.example.demo.payloadResponse.LoginMessage;

public interface UserService {
    String addUser(UserDto userDto);
    LoginMessage loginUser(LoginDto loginDto);
}
