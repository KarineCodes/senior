package com.example.demo.controllers;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Services.ForgotPasswordService;
import com.example.demo.Services.UserService;
import com.example.demo.entities.ForgotPasswordToken;
import com.example.demo.entities.User;
import com.example.demo.repositories.ForgotPasswordRepository;
import com.example.demo.repositories.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;

@Controller
public class ForgotPasswordController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ForgotPasswordService forgotPasswordService;
	
	@Autowired
	ForgotPasswordRepository forgotPasswordRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserService userService;
	
@PostMapping("/password-request")
public ResponseEntity<Map<String, String>> savePasswordRequest(@RequestBody Map<String, String> requestBody) {
    String email = requestBody.get("email");
    User user = userRepository.findByEmail(email);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Email not registered"));
    }

    ForgotPasswordToken forgotPasswordToken = new ForgotPasswordToken();
    forgotPasswordToken.setExpireTime(forgotPasswordService.expireTimeRange());
    forgotPasswordToken.setToken(forgotPasswordService.generateToken());
    forgotPasswordToken.setUser(user);
    forgotPasswordToken.setUsed(false);

    forgotPasswordRepository.save(forgotPasswordToken);

    String emailLink = "http://localhost:5173/reset-password?token=" + forgotPasswordToken.getToken();

    try {
        forgotPasswordService.sendEmail(user.getEmail(), "Password Reset Link", emailLink);
    } catch (UnsupportedEncodingException | MessagingException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error while sending email"));
    }

    // Return the token in the response
    Map<String, String> response = new HashMap<>();
    response.put("success", "Password reset email sent. Check your email for the link.");
    response.put("token", forgotPasswordToken.getToken());

    return ResponseEntity.ok(response);
}

	
	@GetMapping("/reset-password-check")
	public ResponseEntity<String> resetPassword(@RequestParam("token") String token, HttpSession session) {
		session.setAttribute("token", token);
	    ForgotPasswordToken forgotPasswordToken = forgotPasswordRepository.findByToken(token);
	    String validityResult = forgotPasswordService.checkValidity(forgotPasswordToken);

	    return ResponseEntity.ok(validityResult); 
	}

	@PostMapping("/reset-password")
	public ResponseEntity<String> saveResetPassword(@RequestBody Map<String, Object> requestData,  @RequestHeader("Authorization") String token) {
		String password = (String) requestData.get("password");
		System.out.println(password);
		// String token = (String) session.getAttribute("token");
	    if(token == null) {
			System.out.println("error");
	    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token not found in session");
	    }
		ForgotPasswordToken forgotPasswordToken = forgotPasswordRepository.findByToken(token);
		User user = forgotPasswordToken.getUser();
		user.password = passwordEncoder.encode(password);
		forgotPasswordToken.setUsed(true);
		userRepository.save(user);
		forgotPasswordRepository.save(forgotPasswordToken);
		System.out.println("password reset successful");

		return ResponseEntity.ok("You have successfuly reset your password");
	}
	
	/*@PostMapping("/reset-password")
	public ResponseEntity<String> saveResetPassword(HttpServletRequest request) {
		String password = request.getParameter("password");
		String token = request.getParameter("token");
		//String sessionId = session.getId();
      //  System.out.println("Session ID: " + sessionId);
	    if(token == null) {
	    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token not found in session");
	    }
		ForgotPasswordToken forgotPasswordToken = forgotPasswordRepository.findByToken(token);
		String validityResult = forgotPasswordService.checkValidity(forgotPasswordToken);
		if(validityResult == "success") {
		User user = forgotPasswordToken.getUser();
		user.password = passwordEncoder.encode(password);
		forgotPasswordToken.setUsed(true);
		userRepository.save(user);
		forgotPasswordRepository.save(forgotPasswordToken);

		return ResponseEntity.ok("You have successfuly reset your password");}
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token tokenn");
		}*/
}