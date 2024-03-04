import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./MyBooks.css";
import { useAppContext } from "./context/appContext";
import { useAuth } from "./context/authContext";

interface FavoritesProps {
  setToken: React.Dispatch<React.SetStateAction<string|null>>;
}

const Favorites: React.FC<FavoritesProps> = ({ setToken }) => {
  const { reserved, addToReserved, removeFromReserved } = useAppContext()|| { reserved: {}, addToReserved: () => {}, removeFromReserved: () => {} };
  const navigate = useNavigate();
  const {userId, isLoggedIn} = useAuth();

// Example API call in the frontend 
const fetchReservedBooks = async (userId: string | null) => {
  try {
    if (isLoggedIn && userId) {
      const response = await fetch(`http://localhost:8081/api/v1/user/reservedBooks/${userId}`);
      const data = await response.json();
      addToReserved(data);
    } else {
      // Handle missing details
    }
  } catch (error) {
    console.error('API Error:', error);
    // Handle API error
  }
};

// Example usage (assuming userId is available in the component state or context)
useEffect(() => {
  fetchReservedBooks(userId);
}, [isLoggedIn, userId]);


const logOutHandler = () => {
  setToken("");
  localStorage.clear();
  navigate('/login');
}
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

// export function Reserve() {

  const reservedChecker = (id: string) => {
    return reserved[id] !== undefined;
  };

  const handleReserve = async (book: any) => {
    if (reservedChecker(book.id)) {
      alert('This book is already reserved. You cannot reserve it again.');
    } else {
      try {
        // Check if the book is already reserved on the server-side
        const response = await axios.get(`http://localhost:8081/book/${book.id}`);
        if (response.data.reserved) {
          alert('This book is already reserved. You cannot reserve it again.');
        } else {
          const reserveResponse = await axios.patch(`http://localhost:8081/book/reserve/${book.id}`);
          console.log('Reservation response:', reserveResponse.data);
  
          // Only add to reserved state if the reservation is successful
          if (reserveResponse.status === 200) {
            addToReserved(book);
          }
        }
      } catch (error) {
        console.error('API Error:', error);
        // Handle error (e.g., show a user-friendly error message)
      }
    }
  };
  
  return (
    <div className="favorites-container">
      <div className="favorites">
        {Object.keys(reserved).length > 0 ? (
          Object.keys(reserved).map((id) => {
            const book = reserved[id];
            return (
              <div key={id} className="book">
                <div>
                  <h4>{book.name}</h4>
                </div>
                <div>
                  <img src={book.imageUrl} alt="#" />
                </div>
                <div>
                  {reservedChecker(book.id) ? (
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
                      onClick={() => handleReserve(book)}
                    >
                      Reserve
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1>You don't have any reserved books yet!</h1>
        )}
      </div>
    </div>
  );
  
}

export default Favorites;

function setBooks(data: any) {
  throw new Error("Function not implemented.");
}

