import axios from "axios";
import React, { FormEvent, useState } from "react";
import Select from "react-select";
import CustomMultiValue from "./CustomMultiValue";

enum Genre {
  Drama = "Drama",
  ScienceFiction = "ScienceFiction",
  SelfHelp = "SelfHelp",
  Thriller = "Thriller",
}

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [preferredGenres, setPreferredGenres] = useState<Genre[]>([]);
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const genreOptions = Object.values(Genre).map((genre) => ({ value: genre, label: genre }));


  const save = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Basic front-end validation for email
    if (email.trim() === "") {
      alert("Please enter an email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // You can directly use the preferredGenres state which is an array of Genre enum values
      await axios.post("http://localhost:8081/api/v1/user/save", {
        firstName: firstName,
        lastName: lastName,
        age: age,
        mobile: mobile,
        email: email,
        preferredGenre: preferredGenres,
        password: password,
        address: address,
      }, {
        withCredentials: true,
      });

      alert("User registration successful");
    } catch (err) {
      alert("Failed to register user. Please try again.");
      console.error("Error during registration:", err);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>User Registration</h1>

          <form>
            <div className="form-group">
              <label>First Name</label>
              <input
                value={firstName}
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter First Name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                value={lastName}
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter Last Name"
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                value={age}
                className="form-control"
                onChange={(e) => setAge(Number(e.target.value))}
                type="number"
                placeholder="Enter Age"
              />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                value={mobile}
                className="form-control"
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                placeholder="Enter Mobile"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label>Preferred Genres</label>
              <Select
                isMulti
                value={genreOptions.filter(option => preferredGenres.includes(option.value))}
                options={genreOptions}
                onChange={(selectedOptions) => setPreferredGenres(selectedOptions.map(option => option.value as Genre))}
                components={{
                  MultiValue: CustomMultiValue as React.ComponentType<any>, // Use the custom MultiValue component
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                value={address}
                className="form-control"
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter Address"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={save}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
