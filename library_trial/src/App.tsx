import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import Home from "./pages/navbar/home/home";
// import Books from "./pages/navbar/books/books";
import { useState } from "react";
import Footer from "./components/navbar/Footer";
import NavBar2 from "./components/navbar/navBar2";
import BookDetails from "./pages/navbar/MyBooks/BookDetails";
import Favorites from "./pages/navbar/MyBooks/Favorites";
import BookList from "./pages/navbar/MyBooks/bookList";
import Contact from "./pages/navbar/contact/contact";
import Login from "./pages/navbar/login/login";
import Register from "./pages/navbar/login/register";


// function App() {

//   const[token, setToken]= useState(localStorage.getItem("userToken") ?? null)
//   return (
//     <>
//       <BrowserRouter>
//       <main>
//       {!token && <NavBar setToken={setToken} />}
//       {token && <NavBar2 setToken={setToken}/>}
//       {/* <NavBar setToken={setToken}/> */}
//       {/* {token? <Books setToken={setToken}/> : <Login token={token} setToken={setToken}/>} */}
//       <div>
//       <Routes>
        
//         <Route path="/home" element={<Home />}>
//         </Route>

//         <Route path="/about" element={<About />}>
//         </Route>

//         <Route path="/contact" element={<Contact />}>
//         </Route>

//         <Route path="/register" element={<Register/>}>
//         </Route>
        

//          {/* <Route path="/login" element={<Login token={token} setToken={setToken}/>}>
//         </Route> */}
//         <Route path="/bookList" element={<BookList setToken={setToken}/>}>
//         </Route> 
//         <Route path="/books/:id" element={<BookDetails />}>
//         </Route>
//         {/* <Route path="/Favorites" element={<Favorites setToken={setToken}/>}>
//         </Route> */}
                    



//         {/* <Route path="/login" element={token? <Books setToken={setToken}/> : <Login token={token} setToken={setToken}/>}>
//         </Route> */}
       
//         <>
//         <Route path="/login" element={token? <BookList setToken={setToken}/> : <Login token={token} setToken={setToken}/>}>
//         </Route>
//         <Route path="/Reserved" element={token? <Favorites setToken={setToken}/> : <Login token={token} setToken={setToken}/>}>
//         </Route>
//         </>
//       </Routes>
//       </div>
//       </main>
//       </BrowserRouter>
//       <Footer/>
//     </>
//   )
// }

// export default App

// ... (other imports)

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);

  const handleLogout = () => {
    // Perform any additional logout logic if needed
    setToken(null);
    localStorage.removeItem("userToken");
  };

  return (
    <>
      <BrowserRouter>
        <main>
          {!token && <NavBar setToken={setToken} />}
          {token && <NavBar2 setToken={setToken} />}
          <div>
            <Routes>
              <Route
                path="/"
                element={token ? <Navigate to="/home" replace/> : <Login token={token} setToken={setToken} />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bookList" element={<BookList setToken={setToken} />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/logout" element={<Login token={token} setToken={setToken}/>}/>
              <Route
                path="/Reserved"
                element={token ? <Favorites setToken={setToken} /> : <Navigate to="/login" replace />}
              />
              <Route path="/login" element={<Login token={token} setToken={setToken} />} />
            </Routes>
          </div>
          {token && <button onClick={handleLogout}>Logout</button>}
        </main>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;


