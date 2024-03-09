package com.example.demo.Services;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.LoginDto;
import com.example.demo.dtos.UserDto;
import com.example.demo.entities.ConfirmationToken;
import com.example.demo.entities.User;
import com.example.demo.payloadResponse.LoginMessage;
import com.example.demo.repositories.ConfirmationTokenRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    EmailService emailService;

    @Override
    public String addUser(UserDto userDto)
    {
        User user = new User(
            userDto.id, userDto.firstName, userDto.lastName,userDto.email,
            this.passwordEncoder.encode(userDto.password), Integer.parseInt(userDto.age), userDto.isEnabled, userDto.preferredGenre, userDto.address, userDto.mobile
        );
        userRepo.save(user);
        ConfirmationToken confirmationToken = new ConfirmationToken(user);

	     confirmationTokenRepository.save(confirmationToken);

	     SimpleMailMessage mailMessage = new SimpleMailMessage();
	     mailMessage.setTo(user.email);
	     mailMessage.setSubject("Complete Registration!");
	     mailMessage.setText("To confirm your account, please click here : "
	             +"http://localhost:8081/api/v1/user/confirm-account?token="+confirmationToken.getConfirmationToken());
	     emailService.sendEmail(mailMessage);

	  //   System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());
      System.out.println("User registration successful: " + user.firstName + " " + user.lastName);
          return user.firstName + " "+ user.lastName;
    }

	@Override
    public LoginMessage loginUser(LoginDto loginDto){
        User user = userRepo.findByEmail(loginDto.email);

        if (user != null) {
            String password = loginDto.password;
            String encodePassword = user.password;
            Boolean isPwdRight = passwordEncoder.matches(password, encodePassword);

            if (isPwdRight) {
                return new LoginMessage("Login Success", true, user.id);
            } else {
                return new LoginMessage("Login Failed: Incorrect Password", false, (Long) null);
            }
        } else {
            return new LoginMessage("Login Failed: User not found", false, (Long) null);
        }
    }

    @Override
    public Boolean userExists(LoginDto loginDto) {
        User user = userRepo.findByEmail(loginDto.email);
        if (user != null) {
            String password = loginDto.password;
            String encodePassword = user.password;
            Boolean isPwdRight = passwordEncoder.matches(password, encodePassword);
            
            if (isPwdRight) {
                return true;  // User exists and password is correct
            } else {
                return false; // User exists but password is incorrect
            }
        }

        return false; // User does not exist
    }

	@Override
	public boolean emailExists(String email) {
		// TODO Auto-generated method stub
		return userRepo.existsByEmail(email);
	}

	@Override
	public boolean isValidAge(Integer age) {
		// TODO Auto-generated method stub
		return age != null && age >= 15 && age <= 80;
	}
	
	@Override
	public User getUserByEmail(String email) {
	    // TODO: You might want to handle the case where the user doesn't exist
	    return userRepo.findByEmail(email);
	}

	
	 public boolean isValidEmail(String email) {
	        // Use a regular expression to check the email format
	        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
	        Pattern pattern = Pattern.compile(emailRegex);
	        return pattern.matcher(email).matches();
	    }

	 @Override
	 public ResponseEntity<?> confirmEmail(String confirmationToken) {
	     ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

	     if(token != null)
	     {
	         User user = userRepo.findByEmail(token.getUserEntity().email);
	         user.isEanbled = true;
	         userRepo.save(user);
	         return ResponseEntity.ok("Email verified successfully!");
	     }
	     return ResponseEntity.badRequest().body("Error: Couldn't verify email");
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
     
}












