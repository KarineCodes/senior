import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MyBooks.css";
import { BOOK_DETAILS_URL } from "./api";
import { useAppContext } from "./context/appContext";
import { useAuth } from "./context/authContext";

interface Book {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  [key: string]: any; // String index signature
}

export function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState(false); // Track if the book is clicked
  const [isOpen, setIsOpen] = useState(false);
  const { reserved, addToReserved, removeFromReserved } = useAppContext() || { reserved: [], addToReserved: () => {}, removeFromReserved: () => {} };
  const favoritesChecker = (id: string) => {
    return Object.keys(reserved).some((bookId) => bookId === id);
  };

  const { isLoggedIn } =   useAuth();

  const toggleDescription = () => {
    setIsOpen(!isOpen);
    setIsClicked(true); // Set the book as clicked
  };

  const handleApiCall = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:8081/book/reserve/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleUndoReserve = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:8081/book/removeReserve/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    axios
      .get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={`book-details ${isOpen ? 'open' : ''}`} onClick={toggleDescription}>
      <Link to="/bookList" className="back-arrow">&#8592;</Link>
        <div id="bookCont" className="bookCont">
          <div className="cover">
            <img src={book.imageUrl} alt={book.name} />
          </div>
          <div className="page">
            <h2>{book.name}</h2>
          </div>
          <div className="page">
            <p>{book.description}</p>
          </div>
        </div>
        <div className="buttons">
          {isLoggedIn ? (
            favoritesChecker(book.id) ? (
              <button
                className="button-fav"
                onClick={() => {
                  removeFromReserved(book.id);
                  handleUndoReserve(book.id);
                }}
              >
                Undo Reserve
              </button>
            ) : (
              <button
                className="button-fav"
                onClick={() => {
                  if (book) {
                    console.log("Book ID:", book.id);
                    addToReserved(book);
                    handleApiCall(book.id);
                    console.log("reserved");
                  }
                }}
              >
                Reserve
              </button>
            )
          ) : (
            <p>Please log in to reserve this book.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
