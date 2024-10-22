import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing your CSS file

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ email, password }), // Removed role from payload
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        onLogin(); // Call onLogin without role to update the App component state
        navigate("/app"); // Navigate to the App component
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }

    // Clear form fields after submission
    setEmail(""); // Clear email field
    setPassword("");
  };

  const handleRegister = () => {
    navigate("/register"); // Assuming there's a /register route for the registration page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <input
          type="email" // Input type changed to email
          placeholder="Email" // Changed placeholder to Email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
