package com.example.demo.utils;

import com.example.demo.dtos.UserDto;
import com.example.demo.entities.User;

public class UserUtils {
		
		public static User extract(UserDto dto)
		{
			return extract(new User(),dto);
		}
		
		public static User extract(User original, UserDto dto)
		{
			if(dto.firstName != null)
			{
				original.firstName = dto.firstName;
			}
			if(dto.lastName != null)
			{
				original.lastName = dto.lastName;
			}
			if(dto.mobile!= null)
			{
				original.mobile= dto.mobile;
			}
			if(dto.email!= null)
			{
				original.email= dto.email;
			}
			if(dto.password!= null)
			{
				original.password= dto.password;
			}
			if(dto.address!= null)
			{
				original.address= dto.address;
			}
			if(dto.age!= null)
			{
				int age = Integer.parseInt(dto.age);
				original.age = age;
			}
			return original;
		}
}
