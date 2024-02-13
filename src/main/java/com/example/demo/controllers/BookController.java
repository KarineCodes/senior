package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.BookDto;
import com.example.demo.entities.Book;
import com.example.demo.entities.User;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.utils.BookUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@Transactional
public class BookController {
	Logger logger = LoggerFactory.getLogger(BookController.class);
	static ObjectMapper mapper = new ObjectMapper();

	@Autowired(required = true)
	BookRepository bookRepository;

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping(value = "/bookget", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Iterable<Book>> getBooks(){
		
		var result = bookRepository.findAll();

		if(result != null)
		{
			return ResponseEntity.ok(result);
		}
		return null;
	}
	
	@GetMapping(value = "/book/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> getBook(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var book = bookRepository.findById(id_long).orElse(null);

		if(book != null)
		{
			return ResponseEntity.ok(book);
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping(value = "/reservedBooks", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Iterable<Book>> getReservedBook(){
		
        Iterable<Book> reservedBooks = bookRepository.findByIsReserved(true);
        
		if (reservedBooks != null) {
		    return ResponseEntity.ok(reservedBooks);
		}
		return ResponseEntity.ok(Collections.emptyList());

	}

	@GetMapping(value = "/book/searchByName", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Iterable<Book>> getByName(@RequestParam String name){
		Iterable<Book> books = bookRepository.searchByName("%" + name + "%");

        if (books != null) {
            return ResponseEntity.ok(books);
        } else {
            return ResponseEntity.notFound().build();
        }
	}
	
	@PostMapping(value = "/book")
	public ResponseEntity<Book> createBook(@RequestBody BookDto bookDto) {
		Book book = BookUtils.extract(bookDto);

		if(book != null)
		{
			book = bookRepository.save(book);
		}
	
		return ResponseEntity.ok(BookUtils.extract(book, bookDto));
	}

	
	@PatchMapping(value = "/book/reserve/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> reserveBook(@PathVariable String id){
		
		long userId = UserController.getUserId();

		long id_long = Integer.parseInt(id);
		
		var book = bookRepository.findById(id_long).orElse(null);

		if (book != null && (!book.isReserved || !book.isBorrowed)) {
			Optional<User> optionalUser = userRepository.findById(userId);

			if (optionalUser != null) {
				User user = optionalUser.get();
				book.userID = user;
				book.isReserved = true;
				book.issueDate = LocalDate.now();
				bookRepository.save(book);

				ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
            	executorService.schedule(() -> releaseReservation(book), 5, TimeUnit.MINUTES);

				return ResponseEntity.ok(book);
			}
		}
		return ResponseEntity.notFound().build();
	}
	
	@PatchMapping(value = "/book/removeReserve/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> removeReserveBook(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var book = bookRepository.findById(id_long).orElse(null);

		if(book != null)
		{
			book.isReserved = false;
			book.userID = null;

			bookRepository.save(book);
			return ResponseEntity.ok(book);
		}
		return ResponseEntity.notFound().build();
	}
	
	@PatchMapping(value = "/book/borrow/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> borrowBook(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var book = bookRepository.findById(id_long).orElse(null);

		if(book != null)
		{
			book.isBorrowed = true;
			bookRepository.save(book);
			return ResponseEntity.ok(book);
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping(value = "/book/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> deleteBook(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var book = bookRepository.findById(id_long).orElse(null);

		if(book != null)
		{
			bookRepository.delete(book);
			return ResponseEntity.ok(book);
		}
		return ResponseEntity.notFound().build();
	}

	private void releaseReservation(Book book) {
		// Update book properties to release the reservation
		book.userID = null;
		book.isReserved = false;
		book.issueDate = null;
		bookRepository.save(book);
	}
}
