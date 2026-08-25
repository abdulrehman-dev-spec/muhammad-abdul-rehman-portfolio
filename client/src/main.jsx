import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import Admin from "./pages/Admin.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

import "./App.css";

function AdminApp() {
  const [token, setToken] = useState(
    () => localStorage.getItem("adminToken")
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  if (!token) {
    return (
      <AdminLogin
        onLogin={(newToken) => {
          setToken(newToken);
        }}
      />
    );
  }

  return (
    <Admin
      onLogout={handleLogout}
    />
  );
}

const isAdminPage =
  window.location.pathname === "/admin";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isAdminPage ? <AdminApp /> : <App />}
  </StrictMode>
);