import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <nav>
        <div className="nav-brand">AuthFlow</div>
        <div className="nav-links">
          <Link to="/">მთავარი</Link>
          <Link to="/dashboard">პანელი</Link>
          {user ? (
            <>
              <span style={{ fontWeight: 500 }}>👋 {user.name}</span>
              <button className="btn btn-danger" onClick={logout}>
                გამოსვლა
              </button>
            </>
          ) : (
            <Link to="/login">შესვლა</Link>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
