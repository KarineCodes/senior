import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookselector } from '../../../store/selectors/booksSelector';
import { RootState } from '../../../store/store';
import { getAllBooksRequest, getPostByIdRequest } from '../../../store/thunks/booksThunk';

import "../../../components/navbar/NavBar.css";
import "./books.css";
interface BookProps {
  setToken: React.Dispatch<React.SetStateAction<string|null>>;
}

const Books: React.FC<BookProps> = ({ setToken }) => {

// export function Books() {
  const dispatch = useDispatch<any>();
  const books = useSelector((state: RootState) => bookselector(state));

  useEffect(() => {
    if (books.length === 0) {
      dispatch(getAllBooksRequest());
    }
  }, [books, dispatch]);

//get by id 
  const [inputText, setInputText] = useState<number>(0);
  // const book = useSelector((state: RootState) => bookByIdselector(state, inputText) )
  useEffect(() => {
    if (inputText !== 0 ) {
      dispatch(getPostByIdRequest(inputText));
    }
  }, [inputText, dispatch]);
    
  const handleSearch = (event: any) => {
    
  setInputText(event.target.value);
    };
    
    return (
    <div className="App">
      <h1 style={{ color: "green" }}>Using Axios Library to Fetch Data</h1>
      <input
          type="number"
          placeholder="Search"
          value={inputText}
          onChange={ (event)=> handleSearch(event)}
          style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid gray' }}
        />
      <center>
        {books.map((dataObj: any, index: number) => (
          <div
            key={index}
            style={{
              width: "15em",
              backgroundColor: "#CD8FFD",
              padding: 2,
              borderRadius: 10,
              marginBlock: 10,
            }}
          >
            <p style={{ fontSize: 20, color: 'white' }}>{dataObj.name}</p>
          </div>
        ))}
      </center>
    </div>
  );
}

export default Books;


// import { useSelector, useDispatch } from 'react-redux';

// import { getAllBooksRequest } from '../../../store/thunks/booksThunk';
// import {bookselector} from '../../../store/selectors/booksSelector';
// import { RootState } from '../../../store/store';
// import { useEffect } from 'react';
// import fetchInfo from '../../../services/booksService';


// export function Books()  {

//   const dispatch = useDispatch<any>();
//     const books = useSelector((state: RootState) => bookselector(state) )
//     useEffect(() => {
//      books.length === 0 && dispatch(getAllBooksRequest()) 
    
//     } , []);

//     useEffect(() => { 
//       fetchInfo(); 
// }, [])
//     return (
//       <div className="App">
//         <h1 style={{ color: "green" }}>using Axios Library to Fetch Data</h1>
//         <center>
//           {books.map((dataObj, index) => {
//             return (
//               <div
//                 style={{
//                   width: "15em",
//                   backgroundColor: "#CD8FFD",
//                   padding: 2,
//                   borderRadius: 10,
//                   marginBlock: 10,
//                 }}
//               >
//                 <p style={{ fontSize: 20, color: 'white' }}>{dataObj.name}</p>
//               </div>
//             );
//           })}
//         </center>
//       </div>
//     );
  

// }

// export default Books