package com.example.demo.dtos;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.entities.Genre;

public class UserDto {
	
	public long id;
	public String firstName;
	public String lastName;
	public String age;
	public String mobile;
	public String email;
	public List<Genre> preferredGenre = new ArrayList<Genre>();
	public String password;
	public String address;
}
