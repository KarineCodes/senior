package com.example.demo.Services;

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
            userDto.id, userDto.firstName, userDto.lastName,userDto.email,
            this.passwordEncoder.encode(userDto.password)
        );
        userRepo.save(user);
        return (user.firstName + " "+ user.lastName);
    }

    UserDto userDto;

    @Override
    public LoginMessage loginUser(LoginDto loginDto)
    {
        String msg = "";
        User user = userRepo.findByEmail(loginDto.email);
        if(user != null)
        {
            String password = loginDto.password;
            String encodePassword = user.password;
            Boolean isPwdRight = passwordEncoder.matches(password, encodePassword);
            if(isPwdRight){
                User user1 = userRepo.findOneByEmailAndPassword(loginDto.email, encodePassword);
                if(user != null)
                {
                    return new LoginMessage("Login Success", true);
                }
                else{
                    return new LoginMessage("Login Failed", false);
                }
            }
            else{
                return new LoginMessage("password does not match",false);
            }
        }
        else{
            return new LoginMessage("Email not exits",false);
        }

    }
    
    @Override
    public Boolean userExists(LoginDto loginDto)
    {
        String msg = "";
        User user = userRepo.findByEmail(loginDto.email);
        if(user != null)
        {
            String password = loginDto.password;
            String encodePassword = user.password;
            Boolean isPwdRight = passwordEncoder.matches(password, encodePassword);
            if(isPwdRight){
                User user1 = userRepo.findOneByEmailAndPassword(loginDto.email, encodePassword);
                if(user != null)
                {
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
    }
        return null;
}
}
