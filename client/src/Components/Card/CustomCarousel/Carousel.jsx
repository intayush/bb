import React from "react";
import "./CustomCarousel.css";
import leftArrow from "../../../assets/left-arrow.svg";
import rightArrow from "../../../assets/right-arrow.svg";
import {Link} from "react-router-dom";

const CustomCarousel = ({ carouselImages,vehicleid }) => {

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
       <Link to={"/vehicledetails/" + vehicleid}>
      <div className="img-mobile-container">
     
        <img
         
          height="300"
          src={vehicleImagePath + "/" + carouselImages[currentPos]}
          alt=""
        />
      
      </div>
      </Link>
      <div className="arrow-icons-mobile-container">
        <div onClick={goToPrev} className="left-mobile-arrow">
          <img src={leftArrow} alt="" />
        </div>
        <div onClick={goToNext} className="right-mobile-arrow">
          <img src={rightArrow} alt="" />
        </div>
      </div>
    </div>
   
  );
};

export default CustomCarousel;
