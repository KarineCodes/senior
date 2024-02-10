package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Library")
@Data
public class Library {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	
	@Column(name = "name")
	public String Name;
	
	@Column(name = "address")
	public String address;
	
	@Column(name = "mobile")
	public String mobile;
	
	@Column(name = "email")
	public String email;
}
