import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login"; // Import your Login component
import App from "./App"; // Import the component you want to navigate to

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />} />{" "}
      {/* Corrected route to match App component */}
    </Routes>
  );
};

export default AppRoutes;
