import React,{useState} from "react";
import "./Customwebcarousel.css";
import whiteArrowIcon from "../../../assets/whiteArrowIcon.png";

const Customwebcarousel = ({ images,setcounterOfImagesForWebCarousel }) => {
  
  const [currentPos, setCurrPos] = useState(0);
  const { length } = images;

const goToNext = () => {
    setCurrPos(currentPos === length - 1 ? 0 : currentPos + 1);
    setcounterOfImagesForWebCarousel(currentPos)
  };
  const goToPrev = () => {
    setCurrPos(currentPos === 0 ? length - 1 : currentPos - 1);
    setcounterOfImagesForWebCarousel(currentPos)
  };

  return (
    <div className="container">
      <img onClick={goToPrev} style={{transform: "scaleX(-1)",marginRight:'1%'}} src={whiteArrowIcon} alt="" />
      <div className="img-container-web">
        <img className="vehicleData-img-container" src={images[currentPos].original} alt="" />
      </div>
      <img style={{marginLeft:'1%'}}onClick={goToNext} src={whiteArrowIcon} alt="" />
    </div>
  );
};

export default Customwebcarousel;
