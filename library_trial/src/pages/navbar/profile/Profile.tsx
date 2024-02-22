import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Select, { ValueType } from "react-select";
import { useAuth } from "../MyBooks/context/authContext";
import "../login/register.css";

// Define SelectOption type
interface SelectOption {
  value: string;
  label: string;
}

enum Genre {
  Drama = "Drama",
  ScienceFiction = "ScienceFiction",
  SelfHelp = "SelfHelp",
  Thriller = "Thriller",
}

const getGenreString = (genre: Genre): string => {
  switch (genre) {
    case Genre.Drama:
      return "Drama";
    case Genre.ScienceFiction:
      return "ScienceFiction";
    case Genre.SelfHelp:
      return "SelfHelp";
    case Genre.Thriller:
      return "Thriller";
    default:
      return "";
  }
};

interface User {
  firstName: string;
  lastName: string;
  age: number;
  mobile: string;
  email: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const { userId } = useAuth();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [preferredGenres, setPreferredGenres] = useState<Genre[]>([]); // Adjusted state type
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
      await axios.post(
        "http://localhost:8081/api/v1/user/save",
        {
          firstName: firstName,
          lastName: lastName,
          age: age,
          mobile: mobile,
          email: email,
          preferredGenre: preferredGenres,
          password: password,
          address: address,
        },
        {
          withCredentials: true,
        }
      );

      alert("User registration successful");
    } catch (err) {
      alert("Failed to register user. Please try again.");
      console.error("Error during registration:", err);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/user/getUser/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8081/api/v1/user/getGenres/${userId}`)
      .then((res) => {
        const genresFromApi = res.data; // Assuming API returns an array of strings
        const selectedGenres = genresFromApi.map((genreString: string) =>
          // Map string to corresponding Genre enum value
          Object.values(Genre).find((genre) => genre === genreString) || Genre.Drama // Default to Drama if not found
        );
        setPreferredGenres(selectedGenres);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8081/api/v1/user/getFullName/${userId}`)
      .then((res) => {
        userId === res.data.id;
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="container mt-4">
      <div className="card">
        <h1>
          {user?.firstName} {user?.lastName}
        </h1>

        <form>
          <div className="form-group">
            <label>First Name</label>
            <input
              value={firstName}
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder={user?.firstName || ""}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              value={lastName}
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder={user?.lastName || ""}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              value={age}
              className="form-control"
              onChange={(e) => setAge(Number(e.target.value))}
              type="number"
              placeholder={String(user?.age || "")}
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              value={mobile}
              className="form-control"
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              placeholder={user?.mobile || ""}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={user?.email || ""}
            />
          </div>
          <div className="form-group">
            <label>Preferred Genres</label>
            <Select
              isMulti
              value={genreOptions.filter((option) => preferredGenres.includes(option.value))}
              options={genreOptions}
              onChange={(selectedOptions: ValueType<{ value: string; label: string }, true>) => {
                if (Array.isArray(selectedOptions)) {
                  setPreferredGenres(selectedOptions.map((option) => option.value as Genre));
                }
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
          <button className="btn btn-primary" onClick={save}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
