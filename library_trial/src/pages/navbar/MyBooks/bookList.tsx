import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MyBooks.css";

interface Book {
  id: string;
  name: string;
  author: string;
  genre: string;
  imageUrl: string;
  [key: string]: any;
}

interface BookProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const BookList: React.FC<BookProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('name'); // Default filter criteria
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let apiUrl;

        switch (filterBy) {
          case 'name':
            apiUrl = `http://localhost:8081/book/searchByName?name=${searchQuery}`;
            break;
          case 'author':
            apiUrl = `http://localhost:8081/book/author?author=${searchQuery}`;
            break;
          case 'genre':
            apiUrl = `http://localhost:8081/book/searchByGenre?genre=${searchQuery}`;
            break;
          default:
            throw new Error('Invalid filter criteria');
        }

        const response = await axios.get(apiUrl);
        setBooks(response.data);
        setError(null);
      } catch (error) {
        console.error('API Error:', error);
        setError('Error fetching books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, filterBy]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  return (
    <>
      <div className="navbar-form">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filterBy} onChange={handleFilterChange}>
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
        <button type="submit" name="submit" className="btn btn-primary">
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
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
};

export default BookList;
