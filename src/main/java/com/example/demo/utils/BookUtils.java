package com.example.demo.utils;

import com.example.demo.dtos.BookDto;
import com.example.demo.entities.Book;

public class BookUtils {
	
	public static Book extract(BookDto dto)
	{
		return extract(new Book(),dto);
	}
	
	public static Book extract(Book original, BookDto dto)
	{
		if(dto.name != null)
		{
			original.name = dto.name;
		}
		if(dto.description != null)
		{
			original.description = dto.description;
		}
		if(dto.barcode != null)
		{
			original.barcode = dto.barcode;
		}
		if(dto.author!= null)
		{
			original.author= dto.author;
		}
		if(dto.imageUrl!= null)
		{
			original.imageUrl= dto.imageUrl;
		}
		if(dto.genre != null)
		{
			original.genre = dto.genre;
		}
		original.isReserved = dto.isReserved;
		return original;
	}
}
