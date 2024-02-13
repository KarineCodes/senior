import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../MyBooks/context/authContext'; // Import your AuthContext hook
import './login.css';

interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from your AuthContext

  const loginHandler = () => {
    setError("");

    axios({
      url: "http://localhost:8081/api/v1/user/login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log('Before calling login function'); // Add this line
        login(res.data.token,res.data.id);
        console.log('After calling login function'); // Add this line
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("userId", res.data.id);
        navigate('/bookList');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) {
          setError("Invalid credentials");
        } else {
          setError("An error occurred during login");
        }
      });
  };

  return (
    <div className='login'>
      <div className='login-inputs'>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder='Email'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
        {error && <small>{error}</small>}
        <button onClick={() => loginHandler()}>Login</button>
      </div>
    </div>
  );
};

export default Login;
