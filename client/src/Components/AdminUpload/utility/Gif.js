import React from "react";
import PropTypes from "prop-types";

const Gif = ({ gif }) => {
  const vehicleImagePath = "../../vehicles/";

  return (
    <div style={{cursor:"grab"}}>
      
      <img
        src={vehicleImagePath + gif.name}
        alt="gif"
        width="200"
        height="150"
      />
    </div>
  );
};

Gif.propTypes = {
  gif: PropTypes.string.isRequired,
};

export default Gif;
