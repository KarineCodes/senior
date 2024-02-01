import { useState } from 'react';
import './login.css'
import axios from 'axios';

// export function Login({ token, setToken }) {

interface LoginProps {
  token: string|null;
  setToken: React.Dispatch<React.SetStateAction<string|null>>;
}

const Login: React.FC<LoginProps> = ({ token, setToken }) => {
// const Login = ({ token, setToken }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = () => {
    setError("");
    setPassword("");
    setUsername("");

  axios({
    url:"https://fakestoreapi.com/auth/login",
    method:"POST",
    data:{
      username: userName,
      password: password,
    },
  }).then((res) => {
    console.log(res.data.token);
    setToken(res.data.token);
    localStorage.setItem("userToken", res.data.token);
  }).catch((err) => {
    console.log(err.response);
    setError(err.response.data);
  });
  };
    return <div className='login'>
      <div className='login-inputs'>
        <input value={userName} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Username'/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password'/>
        {error && <small>{error}</small>}
        <button onClick={ () =>loginHandler()}>login</button>
      </div>
    </div>;
  };
  
  
export default Login