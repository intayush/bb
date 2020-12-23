import React, { useState } from "react";
import "./MobileCarousel.css";
import mobiledivider from "../../../assets/mobiledivider.png";
import mobileRightIcon from "../../../assets/mobileRightIcon.png";
import mobileLeftIcon from "../../../assets/mobileLeftIcon.png";
import carouselData from "./carouselData/carouselData";

const MobileCarousel = () => {
  const [currentPos, setCurrPos] = React.useState(0);
  const { length } = carouselData;
  const goToNext = () => {
    setCurrPos(currentPos === length - 1 ? 0 : currentPos + 1);
  };
  const goToPrev = () => {
    setCurrPos(currentPos === 0 ? length - 1 : currentPos - 1);
  };
  
  if (!Array.isArray(carouselData) || length <= 0) {
    return null;
  }

  return (
    <div className="container">
      <p className="text">TESTIMONIALS</p>
      <img height="5" width="15" src={mobiledivider} alt="smalldivider" />

      <div className="img-container">
        <img
          className="img-container"
          alt=""
          src={carouselData[currentPos].image}
        />
      </div>
      <div className="text-context">
        <span>{carouselData[currentPos].title}</span>
        <br />
        <p style={{ fontSize: "12px", lineHeight: "12px" }}>
          {carouselData[currentPos].text}
        </p>
      </div>
      <div className="arrow-icon-container">
        <div className="arrow-icons">
          <img onClick={goToPrev} src={mobileLeftIcon} alt="" />
          <div className="grey-dot"></div>
          <img onClick={goToNext} src={mobileRightIcon} alt="" />
        </div>
      </div>
    </div>
  );
};
export default MobileCarousel;
