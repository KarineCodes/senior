package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.UserService;
import com.example.demo.dtos.LoginDto;
import com.example.demo.dtos.UserDto;
import com.example.demo.entities.User;
import com.example.demo.payloadResponse.LoginMessage;
import com.example.demo.repositories.UserRepository;


@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RequestMapping("api/v1/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/save")
    public String saveUser(@RequestBody UserDto userDto) {
        String id = userService.addUser(userDto);
        return id;
    }

    // @PostMapping(path = "/login")
    // public ResponseEntity<?> loginEmployee(@RequestBody LoginDto loginDto) {
        
    //     LoginMessage loginResponse = userService.loginUser(loginDto);
    //     return ResponseEntity.ok(loginResponse);
    // }

    @PostMapping(path = "/login")
public ResponseEntity<?> loginEmployee(@RequestBody LoginDto loginDto) {
    User user = userRepository.findByEmail(loginDto.email);
    // Check if the user exists
    if (userService.userExists(loginDto)) {
        LoginMessage loginResponse = userService.loginUser(loginDto);
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("loginResponse", loginResponse);
        return ResponseEntity.ok(loginResponse);
    } else {
        // User not found, return an appropriate response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}

    
    @GetMapping(path = "/getUser")
    public ResponseEntity<Iterable<User>> getUsers() {
        		
		var result = userRepository.findAll();

		if(result != null)
		{
			return ResponseEntity.ok(result);
		}
		return null;
    }
    
    @RequestMapping(method = RequestMethod.OPTIONS)
public ResponseEntity<?> handleOptions() {
    return ResponseEntity.ok().build();
}

    

}
