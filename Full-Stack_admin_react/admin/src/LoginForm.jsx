import React, { useState } from "react";
import "./css/App.css";

const LoginForm = ({ navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:4175/user_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.role === "admin") {
          console.log("User is Admin");
          localStorage.setItem("token",data.jwt)
          navigate("/adminPage")
        } else {
          navigate('/userPage')
          console.log("User is not Admin");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in:", error);
      });
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
          <h1>Login Form</h1>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="sumbit">Login</button>
    </form>
  );
};

export default LoginForm
