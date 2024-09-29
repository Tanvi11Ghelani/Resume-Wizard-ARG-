import React, { useEffect } from "react";
import "./home.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import TemplatePreviews from "../../components/TemplatePreviews/TemplatePreviews";
import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import FeedbackFrom from "../../components/FeedbackFrom/feedback";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Home() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    console.log(user);
    if (isAuthenticated) {
      axios
        .post("http://localhost:5000/api/auth/google-signup", {
          username: user.name,
          email: user.email,
          avatar: user.picture,
          authProvider: "google",
        })
        .then((response) => {
          console.log("User saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
    }
  }, [isAuthenticated, user]);
  return (
    <div className="home-container">
      <HeroSection />
      <FeaturesSection />
      <TemplatePreviews />
      <TestimonialsSection />
      <FeedbackFrom />
    </div>
  );
}

export default Home;
