import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";
// export function NavBar(){
  interface NavBar2Props {
    setToken: React.Dispatch<React.SetStateAction<string|null>>;
  }
  
  const NavBar2: React.FC<NavBar2Props> = ({ setToken }) => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        // Set a threshold value as needed
        const scrollThreshold = 100;
  
        setIsScrolled(scrollPosition > scrollThreshold);
      };
  
      // Attach the event listener when the component mounts
      window.addEventListener("scroll", handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    
  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
  }
    return(
      <nav className={`navbar-container`}>
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
        
        {/* <div className="log-out-btn-container">
        <button className="log-out-btn" onClick={() => logOutHandler()}>
          Log Out
        </button>
      </div> */}

        <NavLink to="/logout" className="log-out-btn-container">
        <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button>
        </NavLink>

        {/* <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button> */}
        
    </nav>
    );
};

export default NavBar2