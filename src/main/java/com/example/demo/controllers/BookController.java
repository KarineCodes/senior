package com.example.demo.controllers;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.BookDto;
import com.example.demo.entities.Book;
import com.example.demo.repositories.BookRepository;
import com.example.demo.utils.BookUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@Transactional
public class BookController {
	Logger logger = LoggerFactory.getLogger(BookController.class);
	static ObjectMapper mapper = new ObjectMapper();

	@Autowired(required = true)
	BookRepository bookRepository;
	
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
	
	@PostMapping(value = "/book")
	public ResponseEntity<Book> createBook(@RequestBody BookDto bookDto) {
		Book book = BookUtils.extract(bookDto);
		book = bookRepository.save(book);
		return ResponseEntity.ok(BookUtils.extract(book, bookDto));
	}

	
	@PatchMapping(value = "/book/reserve/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> reserveBook(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var book = bookRepository.findById(id_long).orElse(null);

		if(book != null)
		{
			book.isReserved = true;
			bookRepository.save(book);
			return ResponseEntity.ok(book);
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
}

