// authContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('Effect: Checking token');
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      login(storedToken);
    }
  }, []);

  const login = (token: string) => {
    console.log('Login function called');
    // In a real-world scenario, you would validate the token
    // For simplicity, we'll just set isLoggedIn to true
    setLoggedIn(true);
  };

  const logout = () => {
    // Log out the user
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
