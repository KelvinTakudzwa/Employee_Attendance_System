import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api"; // Custom API Service

import "../styles/LoginPage.css"; // Import styles

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/login", { username, password });
      const { role , token } = response.data;

      if(token) {
        localStorage.setItem("token", token);
      }

      if (response.data.role === "admin") navigate("/admin-dashboard", { state: { username } });
      else if (role === "employee") navigate("/employee-dashboard", { state: { username } });
      else setError("Invalid role!");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
