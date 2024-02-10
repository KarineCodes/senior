import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MyBooks.css";


interface Book {
    id: string;
    name: string;
    imageUrl: string;
    [key: string]: any; // String index signature
  }
  //
  interface BookProps {
    setToken: React.Dispatch<React.SetStateAction<string|null>>;
  }
  const BookList: React.FC<BookProps> = () => {

  // 
// export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/book/searchByName?name=${searchQuery}`);
        setBooks(response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchBooks();
  }, [searchQuery]);
  

  return (
<>
<div className="navbar-form">
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" name="submit" className="btn btn-default">
            <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book">
            <div>
              <h4>{book.name}</h4>
            </div>
            <div>
              <img src={book.imageUrl} alt="#" onClick={() => navigate(`/books/${book.id}`)} />
            </div>

          </div>
        ))}
      </div>
    </>
  );
}

export default BookList;
