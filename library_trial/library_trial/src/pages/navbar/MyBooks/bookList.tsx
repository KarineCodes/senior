// import React, { createContext, ReactNode, useState } from "react";

// interface Book {
//   id: string;
//   title: string;
//   image_url: string;
// }

// interface Favorites {
//   [key: string]: Book;
// }

// interface ContextProps {
//   favorites: Favorites;
//   addToFavorites: (book: Book) => void; // Adjust parameter type to Book
//   removeFromFavorites: (id: string) => void;
// }

// const AppContext = createContext<ContextProps | null>(null);

// interface AppContextProviderProps {
//   children: ReactNode;
// }

// const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
//   const [favorites, setFavorites] = useState<Favorites>({});

//   const addToFavorites = (book: Book) => { // Adjust parameter type to Book
//     setFavorites((prevFavorites) => ({
//       ...prevFavorites,
//       [book.id]: book,
//     }));
//   };

//   const removeFromFavorites = (id: string) => {
//     setFavorites((prevFavorites) => {
//       const newFavorites = { ...prevFavorites };
//       delete newFavorites[id];
//       return newFavorites;
//     });
//   };

//   return (
//     <AppContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export { AppContext, AppContextProvider };
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MyBooks.css";
import { API_URL } from "./api";
import { useAppContext } from "./context/appContext";


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
  
  const BookList: React.FC<BookProps> = ({ setToken }) => {
  
  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
  }

  // 
// export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const { reserved, addToReserved, removeFromReserved } = useAppContext() || { reserved: [], addToReserved: () => {}, removeFromReserved: () => {} };

  const navigate = useNavigate();

  const favoritesChecker = (id: string) => {
    return Object.keys(reserved).some((bookId) => bookId === id);
  };

    const handleApiCall = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:8081/book/reserve/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
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
      })
        } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button>
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book">
          <div><h4>{book.name}</h4></div>
          <div><img src={book.imageUrl} alt="#" onClick={() => navigate(`/books/${book.id}`)} /></div>
          <div>
            {favoritesChecker(book.id) ? (
              <button className="button-fav" onClick={() => {removeFromReserved(book.id),handleUndoReserve(book.id)}}>Undo Reserve</button>
            ) : (
              <button className="button-fav" onClick={() => {addToReserved(book),handleApiCall(book.id)}}>Reserve</button>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default BookList;
