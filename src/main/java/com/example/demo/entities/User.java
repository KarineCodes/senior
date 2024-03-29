package com.example.demo.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@Table(name = "User")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	
	@Column(name = "FirstName")
	public String firstName;
	
	@Column(name = "LastName")
	public String lastName;
	
	@Column(name = "Age")
	public int age;
	
	@Column(name = "Mobile")
	public String mobile;
	
	@Column(name = "email")
	public String email;
	
	@Column(name = "PreferredGenre")
	public List<Genre> preferredGenre = new ArrayList<Genre>();
	
	@Column(name = "Password")
	public String password;
	
	@Column(name = "Address")
	public String address;

	public User(long id, String firstName, String lastName, String email, String password, List<Genre> genre)
	{
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.preferredGenre = genre;
	}

    public User() {
    }
}

