// src/components/HeroSection.jsx
import React from "react";
import "./HeroSection.css";
import HeroImage from "../../assest/hero-image.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-img">
        <img src={HeroImage} alt="Hero" className="hero-image" />
      </div>
      <div className="hero-text">
        <h1 className="fade-in-text">Create Your Winning Resume in Minutes.</h1>
        <p className="fade-in-text">
          Our Perfect resume builder takes the hassle out of resume writing. Choose from several templates and follow easy prompts to create the perfect job-ready resume.
        </p>
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
