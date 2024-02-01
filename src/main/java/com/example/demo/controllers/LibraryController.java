package com.example.demo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.LibraryDto;
import com.example.demo.entities.Library;
import com.example.demo.repositories.LibraryRepository;
import com.example.demo.utils.LibraryUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@Transactional
public class LibraryController {
	Logger logger = LoggerFactory.getLogger(LibraryController.class);
	static ObjectMapper mapper = new ObjectMapper();

	@Autowired(required = true)
	LibraryRepository libraryRepository;
	
	@GetMapping(value = "/library/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Library> getLibrary(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var library = libraryRepository.findById(id_long).orElse(null);

		if(library != null)
		{
			return ResponseEntity.ok(library);
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping(value = "/Library")
	public ResponseEntity<Library> createLibrary(@RequestBody LibraryDto libraryDto) {
		Library library = LibraryUtils.extract(libraryDto);
        if(library != null)
        {
            library = libraryRepository.save(library);
        }
		return ResponseEntity.ok(LibraryUtils.extract(library, libraryDto));
	}
	
	@DeleteMapping(value = "/library/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Library> deleteLibrary(@PathVariable String id){
		
		long id_long = Integer.parseInt(id);
		var library = libraryRepository.findById(id_long).orElse(null);

		if(library != null)
		{
			libraryRepository.delete(library);
			return ResponseEntity.ok(library);
		}
		return ResponseEntity.notFound().build();
	}
}

