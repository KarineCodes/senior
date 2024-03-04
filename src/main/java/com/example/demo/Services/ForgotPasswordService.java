package com.example.demo.Services;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.demo.entities.ForgotPasswordToken;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ForgotPasswordService {
    
	@Autowired
    EmailService emailService;
	
    private final int MINUTES = 10;
	
	public String generateToken() {
		return UUID.randomUUID().toString();
	}
	
	public LocalDateTime expireTimeRange() {
		return LocalDateTime.now().plusMinutes(MINUTES);
	}
	
	public void sendEmail(String to, String subject, String emailLink) throws MessagingException, UnsupportedEncodingException {
		
		//MimeMessage message = javaMailSender.createMimeMessage();
		//MimeMessageHelper helper = new MimeMessageHelper(message);
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
	     mailMessage.setTo(to);
	     mailMessage.setSubject(subject);
	     mailMessage.setText("To confirm your account, please click here : "
	             +emailLink);
	     emailService.sendEmail(mailMessage);

		/*String emailContent = "<p>Hello</p>"
				              + "Click the link the below to reset password"
				              + "<p><a href=\""+ emailLink + "\">Change My Password</a></p>"
				              + "<br>"
				              + "Ignore this Email if you did not made the request";
		helper.setText(emailContent, true);
		helper.setFrom("kifah772001@gmail.com", "Coding Techniques Support");
		helper.setSubject(subject);
		helper.setTo(to);
		javaMailSender.send(message);*/
	}
	
	public boolean isExpired (ForgotPasswordToken forgotPasswordToken) {
		return LocalDateTime.now().isAfter(forgotPasswordToken.getExpireTime());
	}
	
	public String checkValidity (ForgotPasswordToken forgotPasswordToken) {
		
		if (forgotPasswordToken == null) {
			
			return "Invalid Token";
		}
		
		else if (forgotPasswordToken.isUsed()) {
			return ("the token is already used");
		}
		
		else if (isExpired(forgotPasswordToken)) {
			return ("the token is expired");
		}
		else {
			return "success";
		}
	}
}

