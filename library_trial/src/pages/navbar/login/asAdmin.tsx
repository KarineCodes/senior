// Import necessary modules
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../MyBooks/MyBooks.css";

// Define the User interface
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  genre: string;
  address: string;
  email: string;
  phone: string;
  [key: string]: any;
}

// Define the UserProps interface
interface UserProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Define the Admin component
const Admin: React.FC<UserProps> = () => {
  // Define state variables
  const [user, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get the navigation object
  const navigate = useNavigate();

useEffect(() => {
    let isMounted = true;
  
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let apiUrl = "http://localhost:8081/api/v1/user/getUser";
  
        const response = await axios.get(apiUrl, { withCredentials: true });
        console.log(response.data);
        if (isMounted) {
          setUsers(response.data);
          console.log("responseL:", response.data);
          setError(null);
        }
      } catch (error) {
        console.error('API Error:', error);
  
        if (isMounted) {
          setError('Error fetching books. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    fetchUsers();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  return (
    <div className="base_list">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        {user.map((user) => (
          <div key={user.id} className="book">
            <div>
              <h4>{user.firstname} {user.lastname}</h4>
              <h4>{user.email}</h4>
              <h4>{user.phone}</h4>
              <h4>{user.address}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
