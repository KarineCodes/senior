package com.example.demo.Services;

import org.springframework.http.ResponseEntity;

import com.example.demo.dtos.LoginDto;
import com.example.demo.dtos.UserDto;
import com.example.demo.entities.User;
// import com.example.Registation.payload.response.LoginMesage;
import com.example.demo.payloadResponse.LoginMessage;

public interface UserService {
    String addUser(UserDto userDto);
    LoginMessage loginUser(LoginDto loginDto);
    Boolean userExists(LoginDto loginDto);
	boolean emailExists(String email);
	boolean isValidAge(Integer age);
	boolean isValidEmail(String email);
    ResponseEntity<?> confirmEmail(String confirmationToken);
	User getUserByEmail(String email);
    String updateUser(UserDto userDto);

}
