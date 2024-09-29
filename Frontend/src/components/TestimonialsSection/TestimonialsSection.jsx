// src/components/TestimonialsSection.jsx
import React from "react";
import Slider from "react-slick";
import "./TestimonialsSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-prev-arrow" onClick={onClick}>
        &#10094;
      </div>
    ); // Left arrow (Unicode for left arrow)
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-next-arrow" onClick={onClick}>
        &#10095;
      </div>
    ); // Right arrow (Unicode for right arrow)
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Autoplay enabled
    autoplaySpeed: 3000, // Slides automatically every 3 seconds
    pauseOnHover: true, // Pause autoplay on hover
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    arrows: true, // Display arrows for manual navigation
  };

  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <Slider {...settings}>
        <div className="testimonial">
          <p>"This resume builder helped me get my dream job!"</p>
          <p>- Purvil Ghvevariya</p>
        </div>
        <div className="testimonial">
          <p>"The templates are professional and easy to use."</p>
          <p>- Tanvi Ghelani</p>
        </div>
        <div className="testimonial">
          <p>"I love the simplicity and effectiveness of this tool."</p>
          <p>- Raj Nishchay</p>
        </div>
      </Slider>
    </section>
  );
};

export default TestimonialsSection;
