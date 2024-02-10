package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Book;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>{

	public List<Book> findByIsReserved(boolean isReserved);
	public List<Book> findByDescription(String description);
	public Optional<Book> findById(Long id);

	@Query("SELECT b FROM Book b WHERE LOWER(b.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Book> searchByName(@Param("name") String name);
}