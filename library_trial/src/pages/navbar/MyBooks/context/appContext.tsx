// appContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

interface Book {
  id: string;
  name: string;
  imageUrl: string;
  // Add other properties if needed
}

interface Reserved {
  [key: string]: Book;
}

interface ContextProps {
  reserved: Reserved;
  addToReserved: (books: Book | Book[]) => void;
  removeFromReserved: (id: string) => void;
}

const defaultValue: ContextProps = {
  reserved: {},
  addToReserved: () => {},
  removeFromReserved: () => {},
};

const AppContext = createContext<ContextProps>(defaultValue);

export const useAppContext = (): ContextProps => {
  const context = useContext(AppContext);

  if (!context) {
    console.error("useAppContext must be used within AppContextProvider");
  }

  return context || defaultValue;
};

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [reserved, setReserved] = useState<Reserved>({}); // Add setReserved state

  const addToReserved = (books: Book | Book[]) => {
    setReserved((prevReserved) => {
      const newReserved = { ...prevReserved };

      if (!Array.isArray(books)) {
        newReserved[books.id] = books;
      } else {
        books.forEach((book) => {
          newReserved[book.id] = book;
        });
      }

      return newReserved;
    });
  };

  const removeFromReserved = (id: string) => {
    setReserved((prevReserved) => {
      const newReserved = { ...prevReserved };
      delete newReserved[id];
      return newReserved;
    });
  };

  return (
    <AppContext.Provider value={{ reserved, addToReserved, removeFromReserved }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
