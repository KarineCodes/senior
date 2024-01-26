package com.example.demo.dtos;

import java.sql.Date;

import com.example.demo.entities.Genre;
import com.example.demo.entities.User;

public class BookDto {
	
	public String name;
	public String description;
	public Date issueDate;
	public String author;
	public boolean isReserved;
	public boolean isBorrowed;
	public String imageUrl;
	public String barcode;
	public Genre genre;
	public User userID;
	public Date dueDate;
}
