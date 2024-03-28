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
  const { reserved, addToReserved, removeFromReserved } = useAppContext() || {
     reserved: [], addToReserved: () => {}, removeFromReserved: () => {} };
  
  const favoritesChecker = (id: string) => {
    return Object.keys(reserved).some((bookId) => bookId === id);
  };
  const { isLoggedIn, userId } =   useAuth();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
    setIsClicked(true); // Set the book as clicked
  };

  //reserve the book
//reserve the book
const handleApiCall = async (bookId: string, userId: string | null) => {
  try {
    if (book && isLoggedIn && userId) {
      const response = await axios.patch(`http://localhost:8081/book/reserve/${bookId}`, { userId });

      if (response.status === 200) {
        // Check if the book is already reserved by another user in the API response
        const updatedBook = response.data;
        if (updatedBook.isReserved && updatedBook.reservedBy == !userId) {
          setErrorMessage("Book is already reserved by another user");
        } else {
          addToReserved(updatedBook);
          console.log("Book reserved successfully");
          setErrorMessage(null); // Reset error message if reservation is successful
        }
      } else {
        setErrorMessage("Failed to reserve book");
        // If reservation fails, remove the book from the reserved array
        removeFromReserved(bookId);
      }
    } else {
      setErrorMessage("Book details, user information, or login status not available");
    }
  } catch (error) {
    console.error("API Error:", error);
    setErrorMessage("Failed to reserve book. Please try again.");
    // If reservation fails, remove the book from the reserved array
    removeFromReserved(bookId);
  }
};

  const handleUndoReserve = async (bookId: string) => {
    try {
      if (book) {
        const response = await axios.patch(`http://localhost:8081/book/removeReserve/${bookId}`);
        if (response.status === 200) {
          removeFromReserved(book.id);
          console.log("Reservation undone successfully");
        } else {
          console.error("Failed to undo reservation");
        }
      } else {
        console.error("Book details are not available");
      }
    } catch (error) {
      console.error("API Error:", error);
      // Handle error (e.g., show a user-friendly error message)
    }
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${BOOK_DETAILS_URL}/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        // Handle error (e.g., show a user-friendly error message)
      }
    };

    fetchBookDetails();
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
                    setErrorMessage(null);
                    handleApiCall(book.id,userId);
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default BookDetails;