package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.UserService;
import com.example.demo.dtos.LoginDto;
import com.example.demo.dtos.UserDto;
import com.example.demo.entities.Book;
import com.example.demo.entities.Genre;
import com.example.demo.entities.User;
import com.example.demo.payloadResponse.LoginMessage;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RequestMapping("api/v1/user")
public class UserController {
    
	private static long user_id;
	
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/save")
    public String saveUser(@RequestBody UserDto userDto) {
        // Check if the name is at least 6 characters
        System.out.println("Save user method triggered!");
    	if (!userService.isValidEmail(userDto.email)) {
            return "Invalid email address";
        }
        if (!userService.isValidAge(Integer.parseInt(userDto.age))) {
            return "Invalid age. It must be an integer between 15 and 80.";
        }
        // Check if the email already exists
        if (userService.emailExists(userDto.email)) {
            return "Email already exists";
        }
        // Check if the password meets the requirements
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (!userDto.password.matches(passwordRegex)) {
           return "Invalid password. Please meet the password requirements.";
        }
        // Save the user
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
    if (userService.userExists(loginDto) && user.isEanbled == true) {
        LoginMessage loginResponse = userService.loginUser(loginDto);
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("loginResponse", loginResponse);
        user_id = user.id;
        return ResponseEntity.ok(loginResponse);
    } else {
        // User not found, return an appropriate response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
    
    @GetMapping(path = "/getUser/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable String id){

        long int_id = Integer.parseInt(id);
        var user = userRepository.findById(int_id);

        return ResponseEntity.ok(user);
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

    @GetMapping(path = "/getFullName/{id}")
    public ResponseEntity<Optional<User>> getFullName(@PathVariable String id){

        long int_id = Integer.parseInt(id);
        var user = userRepository.findById(int_id);

        if(user != null){
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping(path = "/getGenres/{id}")
    public ResponseEntity<List<Genre>> getGenres(@PathVariable String id){

        long int_id = Integer.parseInt(id);
        var user = userRepository.findById(int_id);

        if(user != null){
            return ResponseEntity.ok(user.get().preferredGenre);
        }

        return ResponseEntity.notFound().build();
    }

    	@GetMapping("/reservedBooks/{userId}")
	public ResponseEntity<Iterable<Book>> getReservedBooks(@PathVariable String userId) {
		try {
			long userId_long = Long.parseLong(userId);

			Optional<User> optionalUser = userRepository.findById(userId_long);
			if (optionalUser.isPresent()) {
				User user = optionalUser.get();
				List<Book> reservedBooks = bookRepository.findByUserID(user);

				return ResponseEntity.ok(reservedBooks);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (NumberFormatException e) {
			return ResponseEntity.badRequest().build();
		}
	}

    public String getMethodName(@RequestParam String param) {
        return new String();
    }

        @GetMapping(value="/confirm-account")
        public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
            return userService.confirmEmail(confirmationToken);
        }
    
    @RequestMapping(method = RequestMethod.OPTIONS)
public ResponseEntity<?> handleOptions() {
    return ResponseEntity.ok().build();
}
    public static long getUserId() {
        // Your logic to get or calculate the userId
        return user_id;
    }

}
