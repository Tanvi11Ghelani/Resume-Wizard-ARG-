// Login.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import "./login.css";
import login from "../../assest/login.svg";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../components/context/AuthContext"; // Import AuthContext
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // Use AuthContext
  const { loginWithRedirect } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true); // Update authentication state
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  const handleGoogleSignIn = () => {
    loginWithRedirect(); // Trigger Auth0 Google login when this button is clicked
  };

  const handleGoogleSignInError = (error) => {
    toast.error("Google login failed. Please try again.");
    console.error("Google Login Error:", error);
  };

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      console.log("Google token received: ", token);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigate("/");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={login} alt="Login" className="login-image" />
      </div>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>

          <div className="login-div">
            <button
              className="google-signin-button"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle size={20} /> Sign in with Google
            </button>
          </div>
          <p className="sign-up-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
