package com.example.demo.utils;

import com.example.demo.dtos.LibraryDto;
import com.example.demo.entities.Library;

public class LibraryUtils {
	public static Library extract(LibraryDto dto)
	{
		return extract(new Library(),dto);
	}
	
	public static Library extract(Library original, LibraryDto dto)
	{
		if(dto.Name != null)
		{
			original.Name = dto.Name;
		}
		if(dto.address != null)
		{
			original.address = dto.address;
		}
		if(dto.email!= null)
		{
			original.email= dto.email;
		}
		if(dto.mobile!= null)
		{
			original.mobile= dto.mobile;
		}
		return original;
	}
}
