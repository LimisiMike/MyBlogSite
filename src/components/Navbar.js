import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        </li>
        <li className="navbar-item">
          <button onClick={handleLogout} className="navbar-link navbar-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
