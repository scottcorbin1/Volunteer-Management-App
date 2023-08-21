import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMSG, setErrorMSG] = useState("");

  const loginData = {
    username: username,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3005/AdminLogin", loginData).then((result) => {
      console.log(result);

      if (result.data === "Success") {
        setIsLoggedIn(true)
        navigate("./AdminHome");
      } else {
        setErrorMSG(result.data);
      }
    });
  };

  return (
    <div className="AdminLogin">
      <nav className="login-title">
        <h1>Volunteer Management System</h1>
      </nav>

      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>

        <label>Username: </label>

        <input
          className="login-input"
          type="username"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label>Password:</label>

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <div>
          <p>{errorMSG}</p>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default AdminLogin;
