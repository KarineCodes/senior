// Import necessary modules
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../MyBooks/MyBooks.css";
import { User } from "./asAdmin";

interface Book {
    id: string;
    name: string;
    author: string;
    genre: string;
    imageUrl: string;
    user_id:User;
    [key: string]: any;
  }
  
  interface BookProps {
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  }

// Define the Admin component
const AdminBook: React.FC<BookProps> = () => {
  // Define state variables
  const [book, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get the navigation object
  const navigate = useNavigate();

useEffect(() => {
    let isMounted = true;
  
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let apiUrl = "http://localhost:8081/bookget";
  
        const response = await axios.get(apiUrl, { withCredentials: true });
        console.log(response.data);
        if (isMounted) {
          setBooks(response.data);
          console.log("responseL:", response.data);
          setError(null);
        }
      } catch (error) {
        console.error('API Error:', error);
  
        if (isMounted) {
          setError('Error fetching books. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    fetchUsers();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  return (
    <div className="base_list">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        {book.map((book) => (
          <div key={book.id} className="book">
            <div>
              <h4>{book.name}</h4>
              <h4>{book.imageUrl}</h4>
              <h4>{book.author}</h4>
              <h4>{book.genre}</h4>
              <h4>{book.user_id && book.user_id.id}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBook;
