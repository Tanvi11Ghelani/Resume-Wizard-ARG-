import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assest/logo1.png";
import "./navbar.css";
import { AuthContext } from "../../components/context/AuthContext"; // Import AuthContext
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  // const { handleLogout } = useContext(AuthContext); // Use AuthContext
  const [sticky, setSticky] = useState(false);
  const { isAuthenticated, logout, user } = useAuth0();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLoginRedirect = () => {
    // Instead of calling loginWithRedirect, navigate to the custom login page
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50); // Adjust this value based on your needs
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAuthenticated, logout]);

  return (
    <nav className={`navbar-container ${sticky ? "sticky" : ""}`}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className={`navLinks ${menuActive ? "showmenu" : ""}`}>
        <div className="links">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/resume"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Resume Template
          </NavLink>
          <NavLink
            to="/ats"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ATS
          </NavLink>
          <NavLink
            to="/grammar"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Grammar
          </NavLink>
          <NavLink
            to="/about"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </div>
        <div className="BTN">
          {isAuthenticated ? (
            <div>
              <span className="user-greeting">Hello, {user.name}</span>
              <button onClick={handleLogout} className="logoutBtn btn">
                LOGOUT
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="loginBtn btn"
                onClick={handleLoginRedirect}
              >
                LOGIN
              </NavLink>
              <NavLink
                to="/signup"
                className="signupBtn btn"
                onClick={toggleMenu}
              >
                SIGNUP
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
}

export default Navbar;
