package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

	// @GetMapping("/user/reservedBooks/{userId}")
	// public ResponseEntity<Iterable<Book>> getReservedBooks(@PathVariable String userId) {
	// 	try {
	// 		long userId_long = Long.parseLong(userId);
	// 		Optional<User> optionalUser = userRepository.findById(userId_long);
	// 		if (optionalUser.isPresent()) {
	// 			User user = optionalUser.get();
	// 			List<Book> reservedBooks = bookRepository.findByUserID(user);
	// 			return ResponseEntity.ok(reservedBooks);
	// 		} else {
	// 			return ResponseEntity.notFound().build();
	// 		}
	// 	} catch (NumberFormatException e) {
	// 		return ResponseEntity.badRequest().build();
	// 	}
	// }
	// @GetMapping("book/checkReserved/{id}")
	// public ResponseEntity<Iterable<Book>> checkBookStatus(@PathVariable String id) {
	// 	long id_long = Integer.parseInt(id);
	// 	var book = bookRepository.findById(id_long).orElse(null);
	// 	if(book != null)
	// 	{
	// 		if(!book.isReserved)
	// 		return ResponseEntity.ok(book);
	// 	}
	// 	return ResponseEntity.notFound().build();
	// }

	@GetMapping(value = "/book/searchByName", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Iterable<Book>> getByName(@RequestParam String name){
		Iterable<Book> books = bookRepository.searchByName("%" + name + "%");

        if (books != null) {
            return ResponseEntity.ok(books);
        } else {
            return ResponseEntity.notFound().build();
        }
	}

	@GetMapping(value = "/book/author", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Iterable<Book>> getByAuthor(@RequestParam String author) {
		Iterable<Book> books = bookRepository.searchByAuthor("%" + author + "%");

        if (books != null) {
            return ResponseEntity.ok(books);
        } else {
            return ResponseEntity.notFound().build();
        }
	}

	// @GetMapping(value = "/book/genre/{genre}", produces = MediaType.APPLICATION_JSON_VALUE)
	// public ResponseEntity<Iterable<Book>> getByGenre(@RequestParam String genre) {
	// 	Iterable<Book> books = bookRepository.searchByGenre("%" + genre + "%");

    //     if (books != null) {
    //         return ResponseEntity.ok(books);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
	// }
	
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
public ResponseEntity<Book> reserveBook(@PathVariable String id) {
    try {
        long userId = UserController.getUserId();
        long id_long = Integer.parseInt(id);

        var book = bookRepository.findById(id_long).orElse(null);

        if (book != null) {
            if (!book.isReserved && !book.isBorrowed) {
                Optional<User> optionalUser = userRepository.findById(userId);

                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    book.userID = user;
                    book.isReserved = true;
                    book.issueDate = LocalDate.now();
                    bookRepository.save(book);

                    ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
                    executorService.schedule(() -> releaseReservation(book), 5, TimeUnit.MINUTES);

                    return ResponseEntity.ok(book);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } else {
                // Book is already reserved or borrowed
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (NumberFormatException e) {
        // Handle invalid ID format
        return ResponseEntity.badRequest().build();
    }
}

// @PatchMapping(value = "/book/borrow/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
// public ResponseEntity<Book> borrowBook(@PathVariable String id) {
//     try {
//         long userId = UserController.getUserId();
//         long id_long = Integer.parseInt(id);
//         var book = bookRepository.findById(id_long).orElse(null);
//         if (book != null) {
//             if (!book.isReserved && !book.isBorrowed) {
//                 Optional<User> optionalUser = userRepository.findById(userId);
//                 if (optionalUser.isPresent()) {
//                     User user = optionalUser.get();
//                     book.userID = user;
//                     book.isReserved = true;
//                     book.issueDate = LocalDate.now();
//                     bookRepository.save(book);
//                     return ResponseEntity.ok(book);
//                 } else {
//                     return ResponseEntity.notFound().build();
//                 }
//             } else {
//                 // Book is already reserved or borrowed
//                 return ResponseEntity.status(HttpStatus.CONFLICT).build();
//             }
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     } catch (NumberFormatException e) {
//         // Handle invalid ID format
//         return ResponseEntity.badRequest().build();
//     }
// }

@PatchMapping(value = "/book/borrow/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<List<Book>> borrowBooks(@RequestBody List<String> ids, @PathVariable String userId) {
    try {
        long userId_long = Long.parseLong(userId);
        Optional<User> optionalUser = userRepository.findById(userId_long);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Book> borrowedBooks = new ArrayList<>();

            for (String id : ids) {
                long id_long = Long.parseLong(id);
                var book = bookRepository.findById(id_long).orElse(null);

                if (book != null && !book.isReserved && !book.isBorrowed) {
                    book.userID = user;
                    book.isBorrowed=true;
                    book.setIssueDate(LocalDate.now());
                    bookRepository.save(book);
                    borrowedBooks.add(book);
					ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
                    executorService.schedule(() -> releaseBorrow(book), 1, TimeUnit.MINUTES);
                } else {
                    // Book is already reserved or borrowed
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
            }
            return ResponseEntity.ok(borrowedBooks);
        } else {
            // User not found
            return ResponseEntity.notFound().build();
        }
    } catch (NumberFormatException e) {
        // Handle invalid ID format
        return ResponseEntity.badRequest().build();
    }
}


	@PatchMapping(value = "/book/removeReserve/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> removeReserveBook(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var book = bookRepository.findById(id_long).orElse(null);

		if(book != null)
		{
			book.isReserved = false;
			book.userID = null;
			book.issueDate = null;

			bookRepository.save(book);
			return ResponseEntity.ok(book);
		}
		return ResponseEntity.notFound().build();
	}

	@PatchMapping(value = "/book/removeBorrow/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Book> removeBorrowBook(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var book = bookRepository.findById(id_long).orElse(null);

		if(book != null)
		{
			book.isBorrowed = false;
			book.userID = null;
			book.issueDate = null;

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

	private void releaseBorrow(Book book){
		book.userID = null;
		book.isBorrowed = false;
		book.issueDate = null;
		bookRepository.save(book);
	}
}
