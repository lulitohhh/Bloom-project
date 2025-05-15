import React from "react";
import "./pot.css"




const Pot = ({ plantData }) => {
  return (
    <div className='pot'>
      {plantData ? (
        <img
          src={plantData.isMature ? (plantData.matureImage || plantData.image) : (plantData.sproutImage || plantData.image)}
          alt={plantData.name}
          className="pot-plant"
        />
      ) : (
        <div className="empty-pot"></div>
      )}
    </div>
  );
};

export default Pot;