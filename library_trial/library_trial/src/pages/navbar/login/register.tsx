import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [employeename, setEmployeename] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const save = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/v1/user/save", {
        employeename: employeename,
        email: email,
        password: password,
      },
      {
        withCredentials:true,
      });
      alert("Employee Registration Successfully");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>Student Registration</h1>

          <form>
            <div className="form-group">
              <label>Employee name</label>
              <input
                type="text"
                className="form-control"
                id="employeename"
                placeholder="Enter Name"
                value={employeename}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setEmployeename(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={save}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
// function useState<T>(arg0: string): [any, any] {
//     throw new Error("Function not implemented.");
// }

