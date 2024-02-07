import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './login.css';

interface LoginProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = () => {
    setError("");
    setPassword("");
    setEmail("");

    axios({
      url: "http://localhost:8081/api/v1/user/login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res.data.token);
        setToken(res.data.token);
        localStorage.setItem("userToken", res.data.token);
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


// import axios from "axios";
// import { ChangeEvent, FormEvent, useState } from "react";
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();

//   async function login(event: FormEvent<HTMLButtonElement>) {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8081/api/v1/user/login", {
//         email: email,
//         password: password,
//       },
//       {
//         withCredentials:true,
//       });

//       console.log(response.data);

//       if (response.data.message === "Email not exists") {
//         alert("Email not exists");
//       } else if (response.data.message === "Login Success") {
//         navigate('/home');
//       } else {
//         alert("Incorrect Email and Password not match");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred during login");
//     }
//   }

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <h2>Login</h2>
//           <hr />
//         </div>

//         <div className="row">
//           <div className="col-sm-6">
//             <form>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   placeholder="Enter Email"
//                   value={email}
//                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                     setEmail(event.target.value);
//                   }}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   placeholder="Enter Password"
//                   value={password}
//                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                     setPassword(event.target.value);
//                   }}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 onClick={login}
//               >
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




