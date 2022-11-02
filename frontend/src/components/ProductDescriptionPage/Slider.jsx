import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import "./Slider.css";
const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="sliderSmall">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? "disc active" : "disc"}
            key={index}
          >
            {index === current && (
              <img src={slide?.url} alt="travel image" className="image" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
