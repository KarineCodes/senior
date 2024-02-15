import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import Home from "./pages/navbar/home/home";
// import Books from "./pages/navbar/books/books";
import { useEffect, useState } from "react";
import Footer from "./components/navbar/Footer";
import NavBar2 from "./components/navbar/navBar2";
import BookDetails from "./pages/navbar/MyBooks/BookDetails";
import Favorites from "./pages/navbar/MyBooks/Favorites";
import BookList from "./pages/navbar/MyBooks/bookList";
import { AuthProvider } from "./pages/navbar/MyBooks/context/authContext";
import Contact from "./pages/navbar/contact/contact";
import Login from "./pages/navbar/login/login";
import Register from "./pages/navbar/login/register";


function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);

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
  const handleLogout = () => {
    // Perform any additional logout logic if needed
    setToken(null);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <main>
          {!token && <NavBar setToken={setToken} />}
          {token && <NavBar2 setToken={setToken} />}
          <div>
            <Routes>
              <Route
                path="/"
                element={token ? <Navigate to="/home" replace/> : <Login setToken={setToken} />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bookList" element={<BookList setToken={setToken} />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/logout" element={<Login setToken={setToken}/>}/>
              <Route
                path="/Reserved"
                element={token ? <Favorites setToken={setToken} /> : <Navigate to="/login" replace />}
              />
              <Route path="/login" element={<Login setToken={setToken} />} />
            </Routes>
          </div>
          {/* {token && <button onClick={handleLogout}>Logout</button>} */}
        </main>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}

export default App;


