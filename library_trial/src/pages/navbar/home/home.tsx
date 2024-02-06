import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import imageAbt from "./aboutimage.png";
import imageSrc from "./boooook.png";

const Home: React.FC = () => {

  
  const navigate = useNavigate();
  
  return (
    <div>
    <div className="home-container">
      <div className="home-intro">
        <h1>Welcome to Our Book Library!</h1>
        <h2>There is no friend as loyal as a book</h2>
        <p>
          Explore our vast collection of books and discover your next favorite
          read!
        </p>
        <button className="home-button" onClick={() => navigate(`/contact/`)}> Discover more!</button>
      </div>
      <img src={imageSrc} alt="Book Library" className="home-image" />
    </div>
    <div className="home-about">
      <img src={imageAbt} alt="Bookk Library" className="about-image" />
      <div className="about-text">
      <h1>Why US?</h1>
      <p>Our library signifies a transformative shift towards efficiency and convenience. </p>
      <p> You can browse the books available from your home and
        login to reserve your book remotely!
      </p>
      </div>
      </div>
    </div>
  );
};

export default Home;



// export function Home() {
//     return (
//     <div className="content">
      
//     </div>
//     );
//   }
  
  
//   export default Home