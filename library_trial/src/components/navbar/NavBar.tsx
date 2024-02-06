// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// import "./NavBar.css";
// // export function NavBar(){
//   interface NavBarProps {
//     setToken: React.Dispatch<React.SetStateAction<string|null>>;
//   }
  
//   const NavBar: React.FC<NavBarProps> = ({ setToken }) => {

//     const [isScrolled, setIsScrolled] = useState(false);

//     useEffect(() => {
//       const handleScroll = () => {
//         const scrollPosition = window.scrollY;
//         // Set a threshold value as needed
//         const scrollThreshold = 100;
  
//         setIsScrolled(scrollPosition > scrollThreshold);
//       };
  
//       // Attach the event listener when the component mounts
//       window.addEventListener("scroll", handleScroll);
  
//       // Clean up the event listener when the component unmounts
//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }, []);


//   const logOutHandler = () => {
//     setToken("");
//     localStorage.clear();
//   }
//     return(
//       <nav className={`navbar-container`}>
//       {/* <FaSchool className="icon"></FaSchool> */}
//       <NavLink to="/" className="nav-linkk">
//         Home
//       </NavLink>
//       <NavLink to="/about" className="nav-linkk">
//         About
//         </NavLink>
//         <NavLink to="/contact" className="nav-linkk">
//         Contact
//         </NavLink>
        
//         {/*  */}
//         {/* <NavLink to="/BookDetails" className="nav-linkk">
//         bookDetails
//         </NavLink> */}
//         {/* <NavLink to="/BookList" className="nav-linkk">
//         BookList
//         </NavLink>
//         <NavLink to="/Favorites" className="nav-linkk">
//         Favorites
//         </NavLink> */}
//         {/*  */}

//       {/* <NavLink to="/books" className="nav-link">
//         Books
//         </NavLink> */}
        
//         <NavLink to="/login" className="log-out-btn-container">
//         <button className="log-in-btn" >Log In</button>
//         </NavLink>

//         {/* <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button> */}
        
//     </nav>
//     );
// };

// export default NavBar

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

interface NavBarProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const NavBar: React.FC<NavBarProps> = ({ setToken }) => {
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

  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
  };

  return (
    <nav className={`navbar-container`}>
      <NavLink to="/" className="nav-linkk">
        Home
      </NavLink>
      <NavLink to="/about" className="nav-linkk">
        About
      </NavLink>
      <NavLink to="/contact" className="nav-linkk">
        Contact
      </NavLink>

      {/* Add the Register link */}
      <NavLink to="/register" className="nav-linkk">
        Register
      </NavLink>

      {/* Add the Login link */}
      <NavLink to="/login" className="log-out-btn-container">
        <button className="log-in-btn">Log In</button>
      </NavLink>

      {/* Add the Log Out button */}
      {/* <button className="log-out-btn" onClick={() => logOutHandler()}>
        Log Out
      </button> */}
    </nav>
  );
};

export default NavBar;
