import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import About from "./pages/navbar/about/about";
import Home from "./pages/navbar/home/home";
// import Books from "./pages/navbar/books/books";
import { useState } from "react";
import NavBar2 from "./components/navbar/navBar2";
import BookDetails from "./pages/navbar/MyBooks/BookDetails";
import Favorites from "./pages/navbar/MyBooks/Favorites";
import BookList from "./pages/navbar/MyBooks/bookList";
import Contact from "./pages/navbar/contact/contact";
import Login from "./pages/navbar/login/login";


function App() {

  const[token, setToken]= useState(localStorage.getItem("userToken") ?? null)
  return (
    <>
      <BrowserRouter>
      <main>
      {!token && <NavBar setToken={setToken} />}
      {token && <NavBar2 setToken={setToken}/>}
      {/* <NavBar setToken={setToken}/> */}
      {/* {token? <Books setToken={setToken}/> : <Login token={token} setToken={setToken}/>} */}
      <div>
      <Routes>
        
        <Route path="/home" element={<Home />}>
        </Route>

        <Route path="/about" element={<About />}>
        </Route>

        <Route path="/contact" element={<Contact />}>
        </Route>
        

         {/* <Route path="/login" element={<Login token={token} setToken={setToken}/>}>
        </Route> */}
        <Route path="/bookList" element={<BookList setToken={setToken}/>}>
        </Route> 
        <Route path="/books/:id" element={<BookDetails />}>
        </Route>
        {/* <Route path="/Favorites" element={<Favorites setToken={setToken}/>}>
        </Route> */}
                    



        {/* <Route path="/login" element={token? <Books setToken={setToken}/> : <Login token={token} setToken={setToken}/>}>
        </Route> */}
       
        <>
        <Route path="/login" element={token? <BookList setToken={setToken}/> : <Login token={token} setToken={setToken}/>}>
        </Route>
        <Route path="/Reserved" element={token? <Favorites setToken={setToken}/> : <Login token={token} setToken={setToken}/>}>
        </Route>
        </>
      </Routes>
      </div>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App
