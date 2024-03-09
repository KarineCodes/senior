import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PasswordRequestForm from "./pages/navbar/login/forgetPassword";
import Login from "./pages/navbar/login/login";
import Register from "./pages/navbar/login/register";
import ResetPasswordForm from "./pages/navbar/login/ResetPasswordCheck";
import { TokenProvider, useToken } from "./pages/navbar/login/TokenContext";
import BookDetails from "./pages/navbar/MyBooks/BookDetails";
import BookList from "./pages/navbar/MyBooks/bookList";
import { AuthProvider } from "./pages/navbar/MyBooks/context/authContext";
import Favorites from "./pages/navbar/MyBooks/Favorites";
import Profile from "./pages/navbar/profile/Profile";

import Footer from "./components/footer/Footer1";
import NavBar from "./components/navbar1/NavBar";
import NavBar2 from "./components/navbar1/navBar2";
import Contact from "./pages/navbar/contact1/contact";
import Home from "./pages/navbar/home1/home";
import AppContextProvider from "./pages/navbar/MyBooks/context/appContext";

function App() {
  const { token, setToken } = useToken();
  const storedToken = localStorage.getItem('userToken');
console.log("Stored:",storedToken);
  console.log('Token from context:', token);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      setIsScrolled(scrollPosition > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout: React.Dispatch<React.SetStateAction<string | null>> = () => {
    setToken(null);
    localStorage.removeItem('userToken');
  };

  return (
    <TokenProvider>
      <AuthProvider>
        <AppContextProvider>
          <BrowserRouter>
            <main>
              {!token && <NavBar setToken={setToken} backgroundImage={""} />}
              {token && <NavBar2 setToken={setToken} />}
              <div>
                <Routes>
                  <Route path="/" element={token ? <Navigate to="/home" replace /> : <Login setToken={setToken} />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/bookList" element={<BookList setToken={setToken} />} />
                  <Route path="/books/:id" element={<BookDetails />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/logout" element={<Login setToken={setToken} />} />
                  <Route path="/Reserved" element={token ? <Favorites setToken={setToken} /> : <Navigate to="/login" replace />} />
                  <Route path="/forget-password" element={<PasswordRequestForm />} />
                  <Route
                    path="/reset-password"
                    element={ <ResetPasswordForm />}
                  />
                  <Route path="/login" element={<Login setToken={setToken} />} />
                </Routes>
              </div>
            </main>
            </BrowserRouter>
          <Footer />
          </AppContextProvider>
        </AuthProvider>
      </TokenProvider>
    
  );
}

export default App;
