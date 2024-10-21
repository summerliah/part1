import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import AppRoutes from "./Route.jsx"; // Correctly import your routes
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes /> {/* Use AppRoutes instead of App */}
    </BrowserRouter>
  </StrictMode>
);
