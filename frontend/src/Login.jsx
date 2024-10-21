import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing your CSS file

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        onLogin(role); // Call onLogin from props to update the App component state
        navigate("/app"); // Navigate to the App component
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }

    // Clear form fields after submission
    setUsername("");
    setPassword("");
  };

  const handleRegister = () => {
    navigate("/register"); // Assuming there's a /register route for the registration page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Role selection */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {/* Login Button */}
        <button type="submit">Login</button>
      </form>
      {/* Register Button */}
      <button type="button" className="register-btn" onClick={handleRegister}>
        Register
      </button>
      {/* Display message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
