import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import App from "./App"; // Assuming App is your protected component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<App />} /> {/* Protected route */}
    </Routes>
  );
};

export default AppRoutes;
