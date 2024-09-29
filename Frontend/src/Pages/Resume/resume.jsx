import React from "react";
import "./resume.css";

// Capitalize the component name (React convention)
const Resume = ({ profile = {} }) => {
  // Destructure with fallback/default values
  const {
    firstName = "N/A",
    lastName = "N/A",
    jobTitle = "N/A",
    city = "N/A",
    country = "N/A",
    email = "N/A",
    phone = "N/A",
    professionalSummary = "No professional summary provided.",
    experience = [],
    education = [],
    skills = [],
  } = profile;

  return (
    <div className="resume-container">
      <header className="header">
        <h1>
          {firstName} {lastName}
        </h1>
        <h2>{jobTitle}</h2>
        <p>
          {city}, {country}
        </p>
        <p>
          {email} | {phone}
        </p>
      </header>

      <section className="professional-summary">
        <h3>Professional Summary</h3>
        <p>{professionalSummary}</p>
      </section>

      {/* Experience Section */}
      <section className="experience">
        <h3>Experience</h3>
        {experience.length > 0 ? (
          experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h4>{exp.jobTitle}</h4>
              <p>
                {exp.startDate} -{" "}
                {exp.currentlyWorking ? "Present" : exp.endDate}
              </p>
              <p>{exp.location}</p>
              <p>{exp.description}</p>
            </div>
          ))
        ) : (
          <p>No experience added.</p>
        )}
      </section>

      {/* Education Section */}
      <section className="education">
        <h3>Education</h3>
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index} className="education-item">
              <h4>
                {edu.schoolOrUniversity}, {edu.degree}
              </h4>
              <p>
                {edu.startDate} -{" "}
                {edu.currentlyStudying ? "Present" : edu.endDate}
              </p>
              <p>
                {edu.city}, {edu.country}
              </p>
              <p>{edu.description}</p>
            </div>
          ))
        ) : (
          <p>No education added.</p>
        )}
      </section>

      {/* Skills Section */}
      <section className="skills">
        <h3>Skills</h3>
        <ul>
          {skills.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <p>No skills added.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

// Example usage
const profile = {
  firstName: "John",
  lastName: "Doe",
  jobTitle: "Software Engineer",
  city: "San Francisco",
  country: "USA",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  professionalSummary:
    "A skilled software engineer with 5+ years of experience...",
  experience: [
    {
      jobTitle: "Frontend Developer",
      startDate: "Jan 2020",
      endDate: "Present",
      location: "San Francisco, CA",
      description: "Developed and maintained user interfaces...",
      currentlyWorking: true,
    },
    {
      jobTitle: "Junior Web Developer",
      startDate: "Jan 2018",
      endDate: "Dec 2019",
      location: "New York, NY",
      description: "Worked on various web development projects...",
    },
  ],
  education: [
    {
      schoolOrUniversity: "MIT",
      degree: "BSc Computer Science",
      startDate: "Sep 2014",
      endDate: "May 2018",
      city: "Cambridge",
      country: "USA",
      description: "Focused on software engineering and algorithms.",
      currentlyStudying: false,
    },
  ],
  skills: ["JavaScript", "React.js", "Node.js", "CSS", "HTML"],
};

const App = () => {
  return <Resume profile={profile} />;
};

export default App;
