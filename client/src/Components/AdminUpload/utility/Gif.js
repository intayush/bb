import React from "react";


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



export default Gif;
