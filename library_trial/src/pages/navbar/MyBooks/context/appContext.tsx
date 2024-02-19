
import React, { createContext, ReactNode, useContext, useState } from "react";

interface Book {
  [x: string]: string | undefined;
  id: string;
  name: string;
  imageUrl:string
  // Add other properties if needed
}

interface reserved {
  [key: string]: Book; // Adjust the type according to your requirement
}

interface ContextProps {
  reserved: reserved;
  addToReserved: (book: Book) => void;
  removeFromReserved: (id: string) => void;
}

const AppContext = createContext<ContextProps | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Appcontext must be within AppContextProvider");
  }

  return context;
};

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [reserved, setReserved] = useState<reserved>({});

  const addToReserved = (books: Book | Book[]) => {
    setReserved((prevReserved) => {
      const newReserved = { ...prevReserved };
  
      // If a single book is provided, add it to the reserved list
      if (!Array.isArray(books)) {
        newReserved[books.id] = books;
      } else {
        // If an array of books is provided, add each book to the reserved list
        books.forEach((book) => {
          newReserved[book.id] = book;
        });
      }
  
      return newReserved;
    });
  };  

  const removeFromReserved = (id: string) => {
    setReserved((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[id];
      return newFavorites;
    });
  };

  return (
    <AppContext.Provider value={{ reserved, addToReserved, removeFromReserved }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
