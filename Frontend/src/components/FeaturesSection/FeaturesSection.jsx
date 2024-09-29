// src/components/FeaturesSection.jsx
import React from "react";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2>Why Choose Us?</h2>
      <div className="features">
        <div className="feature">
          <i className="fas fa-check-circle feature-icon"></i>
          <h3>Easy to Use</h3>
          <p>Our intuitive interface makes resume building a breeze.</p>
        </div>
        <div className="feature">
          <i className="fas fa-file-alt feature-icon"></i>
          <h3>Professional Templates</h3>
          <p>Choose from a variety of templates designed by professionals.</p>
        </div>
        <div className="feature">
          <i className="fas fa-robot feature-icon"></i>
          <h3>ATS-Friendly</h3>
          <p>Our resumes are optimized for Applicant Tracking Systems.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
