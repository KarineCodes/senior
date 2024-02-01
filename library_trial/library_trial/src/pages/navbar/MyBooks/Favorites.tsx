import axios from "axios";
import { useEffect } from "react";
import "./MyBooks.css";
import { RESERVED_BOOK_URL } from "./api";
import { useAppContext } from "./context/appContext";


// 
interface FavoritesProps {
  setToken: React.Dispatch<React.SetStateAction<string|null>>;
}

const Favorites: React.FC<FavoritesProps> = ({ setToken }) => {

  useEffect(() => {
    axios.get(RESERVED_BOOK_URL)
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }, []);
const logOutHandler = () => {
  setToken("");
  localStorage.clear();
}

// export function Reserve() {
  const { reserved, addToReserved, removeFromReserved } = useAppContext()!;

  const reservedChecker = (id: string) => {
    return reserved[id] !== undefined;
  };

  return (
    <div>
      <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button>
    <div className="favorites">
      {Object.keys(reserved).length > 0 ? (
        Object.keys(reserved).map((id) => {
          const book = reserved[id];
          return (
            <div key={book.id} className="book">
              <div>
                <h4>{book.name}</h4>
              </div>
              <div>
                <img src={book.imageUrl} alt="#" />
              </div>
              <div>
                {reservedChecker(book.id) ? (
                  <button
                    className="button-fav"
                    onClick={() => removeFromReserved(book.id)}
                  >
                    Undo Reserve
                  </button>
                ) : (
                  <button
                    className="button-fav"
                    onClick={() => addToReserved(book)}
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <h1>You don't have any reserved books yet!</h1>
      )}
    </div>
    </div>
  );
}

export default Favorites;

function setBooks(data: any) {
  throw new Error("Function not implemented.");
}

