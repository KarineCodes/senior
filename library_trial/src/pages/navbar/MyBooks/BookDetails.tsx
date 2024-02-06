import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MyBooks.css";
import { BOOK_DETAILS_URL } from "./api";

interface Book {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  authors: string[];
  genres: string[];
}

export function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams();
  console.log("book: ",id);

  useEffect(() => {
    axios.get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details">

      <div className="book-image">
        <h2>{book.name}</h2>
        <img src={book.imageUrl} alt="#" />
      </div>
      <div className="book-description">
        <h2>Description</h2>
        <p>{book.description}</p>
      </div>
    </div>
  );
}

export default BookDetails;
