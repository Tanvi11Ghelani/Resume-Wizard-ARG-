import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState(""); // State to capture email input

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!email) {
      toast.error("Please enter an email address."); // Show error toast
      return;
    }

    let emailSend = {
      email: email,
    };

    try {
      const res = await fetch("http://localhost:5000/api/email/sendEmail", {
        method: "POST",
        body: JSON.stringify(emailSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Email sent successfully!"); // Show success toast
        setEmail("");
      } else {
        const errorData = await res.json();
        toast.error(`Error sending email: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error sending email:", err);
      toast.error("An error occurred while sending the email."); // Show error toast
    }
  };

  return (
    <footer className="footer-container">
      <ToastContainer /> {/* Toast Container to display toasts */}
      <div className="footer-top">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            We create beautiful resumes to help you stand out in your job
            search. Join us to build your professional profile today.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resume"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Resume Template
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ats"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                ATS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/grammar"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Grammar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Subscribe to Our Newsletter</h2>
          <form className="Subscribe-section " onSubmit={sendEmail}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="Btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Resume Builder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
