import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import "./App.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="nav-brand">AuthFlow</div>
      <div className="nav-links">
        <Link to="/">მთავარი</Link>
        <Link to="/dashboard">პანელი</Link>
        {user ? (
          <button className="logout-btn" onClick={logout}>
            გამოსვლა ({user.name})
          </button>
        ) : (
          <Link to="/login">შესვლა</Link>
        )}
      </div>
    </nav>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontSize: "3rem" }}>🔒</h1>
        <h2>მოგესალმებით, {user?.name}!</h2>
        <p>ეს არის თქვენი პირადი სამუშაო სივრცე.</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <h1>მთავარი გვერდი 🏠</h1>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
