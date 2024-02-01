package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Book;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>{

	public List<Book> findByIsReserved(boolean isReserved);
}