import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";
// export function NavBar(){
  interface NavBar2Props {
    setToken: React.Dispatch<React.SetStateAction<string|null>>;
  }
  
  const NavBar2: React.FC<NavBar2Props> = ({ setToken }) => {

  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
  }
    return(
      <nav className="navbar-container">
      {/* <FaSchool className="icon"></FaSchool> */}
      <NavLink to="/" className="nav-linkk">
        Home
      </NavLink>
      <NavLink to="/about" className="nav-linkk">
        About
        </NavLink>
        <NavLink to="/contact" className="nav-linkk">
        Contact
        </NavLink>
        
        {/*  */}
        {/* <NavLink to="/BookDetails" className="nav-linkk">
        bookDetails
        </NavLink> */}
        <NavLink to="/BookList" className="nav-linkk">
        BookList
        </NavLink>
        <NavLink to="/Reserved" className="nav-linkk">
        Reserved
        </NavLink>
        {/*  */}

      {/* <NavLink to="/books" className="nav-link">
        Books
        </NavLink> */}
        
        <NavLink to="/login" className="log-in-btn">
        <button className="log-in-btn" >Log In</button>
        </NavLink>

        {/* <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button> */}
        
    </nav>
    );
};

export default NavBar2