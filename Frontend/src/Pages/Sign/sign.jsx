import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./sign.css";
import signupImage from "../../assest/sign.svg";
import { AuthContext } from "../../components/context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();

  const validateUsername = (value) => {
    if (value.trim().length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return false;
    }
    return true;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      toast.error("Invalid email format.");
      return false;
    }
    return true;
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Signup successful!");
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
      console.error("Signup Error:", error.response?.data);
    }
  };

  const changeAvatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview("");
    }
  };

  const handleGoogleSignIn = () => {
    loginWithRedirect({
      redirectUri: window.location.origin,
    });
  };

  useEffect(() => {
    const saveGoogleUserDataToMongoDB = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently(); // Get Auth0 access token

          // Send user data to the backend for signup or login
          const response = await axios.post(
            "http://localhost:5000/api/auth/google-signup",
            {
              username: user.name,
              email: user.email,
              avatar: user.picture,
              authProvider: "auth0", // Indicate Auth0 as the provider
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Use Auth0 token to authenticate
              },
            }
          );

          toast.success("Google signup successful!");
          localStorage.setItem("token", response.data.token); // Store backend JWT
          setIsAuthenticated(true);
          navigate("/");
        } catch (error) {
          toast.error("Failed to save Google user data.");
          console.error("Error saving Google user data:", error);
        }
      }
    };

    if (isAuthenticated) {
      saveGoogleUserDataToMongoDB();
    }
  }, [
    isAuthenticated,
    user,
    setIsAuthenticated,
    navigate,
    getAccessTokenSilently,
  ]);

  return (
    <div className="signup-container">
      <div className="form-section">
        <form onSubmit={handleRegister}>
          <h2>Signup</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => validateUsername(username)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
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
              onBlur={() => validatePassword(password)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatar">Profile Picture</label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={changeAvatarHandler}
            />
          </div>
          <button type="submit" className="signup-button">
            Signup
          </button>

          <div className="google-signup-div">
            <button
              className="google-signin-button"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle size={20} /> Sign up with Google
            </button>
          </div>
        </form>
      </div>
      <div className="image-section">
        <img src={signupImage} alt="Signup" className="signup-image" />
      </div>
    </div>
  );
};

export default Signup;
