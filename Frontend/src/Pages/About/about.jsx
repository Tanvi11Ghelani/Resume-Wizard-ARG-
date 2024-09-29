import React from 'react';
import './about.css'; // Custom CSS with unique design
import { FaCheckCircle, FaCode, FaLaptopCode, FaBullseye } from 'react-icons/fa'; // Icons for visual effect

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our Resume Builder</h1>
        <p className="subtitle">Creating professional resumes made easy</p>
      </div>
      
      <div className="about-content">
        <div className="card about-intro">
          <h2>What We Do</h2>
          <p>
            Our Resume Builder simplifies the process of creating resumes with professional templates and an intuitive user experience. Whether you're applying for your first job or seeking a career change, we make it easy for you to create a resume that stands out.
          </p>
        </div>

        <div className="card about-features">
          <h2>Key Features</h2>
          <ul className="feature-list">
            <li><FaCheckCircle className="icon"/> Responsive and user-friendly interface</li>
            <li><FaCheckCircle className="icon"/> ATS resume checker for job optimization</li>
            <li><FaCheckCircle className="icon"/> Customizable templates with live preview</li>
            <li><FaCheckCircle className="icon"/> Default editable resume templates</li>
          </ul>
        </div>

        <div className="card about-developer">
          <h2>About the Developer</h2>
          <p>
            Hi, I'm Harshil Maharaj, a dedicated full-stack developer with expertise in the MERN stack. I built this Resume Builder to simplify the job application process for people everywhere. My passion is in combining backend logic with intuitive frontend design.
          </p>
        </div>

        <div className="card about-tech">
          <h2>Technologies Used</h2>
          <ul className="tech-list">
            <li><FaLaptopCode className="icon"/> React.js for dynamic and responsive UI</li>
            <li><FaCode className="icon"/> Node.js and Express.js for robust backend functionality</li>
            <li><FaLaptopCode className="icon"/> MongoDB for seamless data management</li>
            <li><FaLaptopCode className="icon"/> Tailwind CSS for modern, responsive styling</li>
          </ul>
        </div>

        <div className="card about-mission">
          <h2>Our Mission</h2>
          <p>
            We strive to make professional resumes accessible to everyone, enabling job seekers to craft standout resumes without technical skills. Our goal is to simplify resume creation while maintaining quality and personalization.
          </p>
          <FaBullseye className="mission-icon"/>
        </div>
      </div>
    </div>
  );
};

export default About;
