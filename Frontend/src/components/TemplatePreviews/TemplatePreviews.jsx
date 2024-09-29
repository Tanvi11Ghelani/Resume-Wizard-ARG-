// src/components/TemplatePreviews.jsx
import React from "react";
import "./TemplatePreviews.css";
import Template from "../../assest/Template.png";
import { Link } from "react-router-dom";

const TemplatePreviews = () => {
  return (
    <section className="template-previews">
      <h2>Choose Your Template</h2>
      <div className="templates">
        <div className="template">
          <img src={Template} alt="Template 1" className="template-img" />
          <Link to="/resume" className="edit-button">
            Use This Template
          </Link>
        </div>
        <div className="template">
          <img src={Template} alt="Template 2" className="template-img" />
          <Link to="/resume" className="edit-button">
            Use This Template
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TemplatePreviews;
