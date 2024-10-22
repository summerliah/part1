import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TaskManagement from "./TaskManagement"; // New component for task management

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // Track the role of the user
  const navigate = useNavigate();

  // Handle login success
  const handleLogin = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
    navigate("/task-management"); // Navigate to the task management dashboard
  };

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        <Route path="/task-management" element={<TaskManagement />} />
      )}
    </Routes>
  );
};

export default App;
