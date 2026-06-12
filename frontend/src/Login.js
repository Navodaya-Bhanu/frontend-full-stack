import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let [getUsername, setGetUsername] = useState(false);
  let [getPassword, setGetPassword] = useState(false);

  let handleSubmit = async (event) => {
    event.preventDefault();

    setGetUsername(false);
    setGetPassword(false);
    let hasError = false;

    if (username === "") {
      setGetUsername(true);
      hasError = true;
    }
    if (password === "") {
      setGetPassword(true);
      hasError = true;
    }

    if (hasError === true) return;

    try {
      let response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      let data = await response.json();

      if (data.Res === "Success") {
        navigate("/dashboard", { state: data });
      } else {
        alert(data.message || "Login failed! Invalid credentials.");
      }
    } catch (error) {
      alert("Backend server connection failed.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="username">Username or Email:</label><br />
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (e.target.value) setGetUsername(false);
          }}
          autoFocus
        /><br />
        {getUsername && (
          <span id="username-error" style={{ color: "red" }}>
            <small>Enter your username or email</small>
          </span>
        )}
        <br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
                   value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value) setGetPassword(false);
          }}
        /><br />
        {getPassword && (
          <span id="password-error" style={{ color: "red" }}>
            <small>Enter your password</small>
          </span>
        )}
        <br />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account? <Link to="/">Register here</Link>
      </p>
    </div>
  );
}