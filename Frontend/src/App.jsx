// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider correctly
import Home from "./Pages/Home/home";
import About from "./Pages/About/about";
import Login from "./Pages/Login/login";
import Sign from "./Pages/Sign/sign";
import Resume from "./Pages/Resume/resume";
import Ats from "./Pages/Ats/ats";
import Grammar from "./Pages/Grammar/grammar";
import ChatBot from "./components/ChatBot/chatbot";
import Navbar from "./components/Navbar/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./components/context/AuthContext"; // Import AuthProvider
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <AuthProvider>
      <Auth0Provider
        domain="dev-2copwt35s0cenofx.us.auth0.com"
        clientId="STFvs0aIdyBiyQKzn3q1uVvLkyH70753"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/ats" element={<Ats />} />
          </Routes>
          <ToastContainer position="top-center" />
          <Toaster position="top-center" />
          <Footer />
        </Router>
      </Auth0Provider>
    </AuthProvider>
  );
}

export default App;
