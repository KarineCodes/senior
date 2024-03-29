package com.example.demo.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.LoginDto;
import com.example.demo.dtos.UserDto;
import com.example.demo.entities.User;
import com.example.demo.payloadResponse.LoginMessage;
import com.example.demo.repositories.UserRepository;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDto userDto)
    {
        User user = new User(
            userDto.id, userDto.firstName,userDto.lastName,userDto.email,
            this.passwordEncoder.encode(userDto.password),userDto.preferredGenre
        );
        userRepo.save(user);
        return (user.firstName + " "+ user.lastName);
    }

    @Override
public String updateUser(UserDto userDto) {
    // Find the existing user by ID
    Optional<User> optionalUser = userRepo.findById(userDto.id);

    if (optionalUser.isPresent()) {
        User existingUser = optionalUser.get();

        if(userDto.age != null)
        {
            existingUser.setAge(Integer.parseInt(userDto.age));
        }

        if(userDto.mobile != null)
        {
            existingUser.setMobile(userDto.mobile);
        }

        if (userDto.address != null) {
            existingUser.setAddress(userDto.address);
        }

        if (userDto.password != null) {
            existingUser.setPassword(passwordEncoder.encode(userDto.password));
        }

        if (userDto.preferredGenre != null) {
            existingUser.setPreferredGenre(userDto.preferredGenre);
        }

        // Save the updated user
        userRepo.save(existingUser);

        return (existingUser.getFirstName() + " " + existingUser.getLastName() + " has been updated.");
    }
    return null;
}

    UserDto userDto;

    @Override
    public LoginMessage loginUser(LoginDto loginDto)
    {
        User user = userRepo.findByEmail(loginDto.email);
        if(user != null)
        {
            String password = loginDto.password;
            String encodePassword = user.password;
            Boolean isPwdRight = passwordEncoder.matches(password, encodePassword);
            
            if(isPwdRight){
                return new LoginMessage("Login Success", true, user.id);
            }
            else{
                return new LoginMessage("password does not match",false, (Long) null);
            }
        }
        else{
            return new LoginMessage("Email not exits",false, (Long) null);
        }

    }
    
    @Override
    public Boolean userExists(LoginDto loginDto)
    {
        User user = userRepo.findByEmail(loginDto.email);
        if(user != null)
        {
            String password = loginDto.password;
            String encodePassword = user.password;
            Boolean isPwdRight = passwordEncoder.matches(password, encodePassword);
           
            if(isPwdRight){
                return true;
            }
            else{
                return false;
            }
    }
        return null;
}
}
