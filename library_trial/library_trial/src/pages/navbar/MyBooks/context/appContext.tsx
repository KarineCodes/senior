
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

  const addToReserved = (book: Book) => {
    setReserved((prevFavorites) => ({
      ...prevFavorites,
      [book.id]: book,
    }));
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
