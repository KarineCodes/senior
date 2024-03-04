package com.example.demo.entities;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@Table(name = "Book")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	
	@Column(name = "Name")
	public String name;
	
	@Column(name = "Description")
	public String description;
	
	@Column(name = "IssueDate")
	public LocalDate issueDate;
	
	@Column(name = "Author")
	public String author;
	
	@Column(name = "IsReserved")
	public boolean isReserved;
	
	@Column(name = "IsBorrowed")
	public boolean isBorrowed;
	
	@Column(name = "url")
	public String imageUrl;
	
	@Column(name = "Barcode")
	public String barcode;
	
	@Column(name = "Genre")
	public Genre genre;
	
	@ManyToOne
	@JoinColumn(name = "user_ID")
	public User userID;
	
	@Column(name = "DueDate")
	public Date dueDate;
}


