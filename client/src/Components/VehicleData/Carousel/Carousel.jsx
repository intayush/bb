import React from "react";
import leftArrow from "../../../assets/left-arrow.svg";
import rightArrow from "../../../assets/right-arrow.svg";
import "./Carousel.css";

const CustomCarousel = ({ carouselImages,imagePopUp }) => {
  const [currentPos, setCurrPos] = React.useState(0);
  const { length } = carouselImages;
  const goToNext = () => {
    setCurrPos(currentPos === length - 1 ? 0 : currentPos + 1);
  };
  const goToPrev = () => {
    setCurrPos(currentPos === 0 ? length - 1 : currentPos - 1);
  };

  if (!Array.isArray(carouselImages) || length <= 0) {
    return null;
  }

  const vehicleImagePath = "../../../vehicles";

  return (
    <div className="mobile-container">
      <div onClick={imagePopUp} className="img-mobile-container">
      <img height="250" width="100%" src={vehicleImagePath + "/" + carouselImages[currentPos]} alt=""/>
      </div>

      <div className="arrow-icons-mobile-container">
        <div onClick={goToPrev} className="left-mobile-arrow">
          <img height="12" src={leftArrow} alt="" />
        </div>
        <div onClick={goToNext} className="right-mobile-arrow">
          <img style={{paddingLeft:"3%"}} height="12" src={rightArrow} alt="" />
        </div>
      </div>
     
    </div>
  );
};

export default CustomCarousel;
