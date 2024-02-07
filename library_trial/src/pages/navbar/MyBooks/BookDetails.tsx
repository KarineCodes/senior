import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MyBooks.css";
import { BOOK_DETAILS_URL } from "./api";

interface Book {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  authors: string[];
  genres: string[];
}

export function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState(false); // Track if the book is clicked
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
    setIsClicked(true); // Set the book as clicked
  };

  useEffect(() => {
    axios.get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }
  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= 32; i++) {
      pages.push(<span key={i} className={`page page-${i}`}></span>);
    }
    return pages;
  };

  return (
    <div className={`book-details ${isOpen ? 'open' : ''}`} onClick={toggleDescription}>
      <div className="book-image" >
        <h2>{book.name}</h2>
        <img src={book.imageUrl} alt="#" />
      </div>
        <div className="book-description">
            <span className="page turn"></span>
  <span className="page turn"></span>
  <span className="cover"></span>
  <span className="page"></span>
  <span className="page"></span>
  <span className="page">{book.description}</span>
  <span className="page"></span>
  <span className="page"></span>
  <span className="page"></span>
  <span className="cover turn"></span>
        </div>
      
    </div>
    );
  
  // return (
  //   <div className={`book-details ${isOpen ? 'open' : ''}`} onClick={toggleDescription}>
  //     <div className="book">
  //       <div className="cover">
  //         <img src={book.imageUrl} alt="#" />
  //       </div>
  //       <div className={`page turn ${isOpen ? 'open' : ''}`}></div>
  //     </div>
  //     {isOpen && (
  //       <div className="book-description">
  //         <h2>Description</h2>
  //         <p>{book.description}</p>
  //       </div>
  //     )}
  //   </div>
  // );

}

export default BookDetails;
