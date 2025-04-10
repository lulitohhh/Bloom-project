import React from "react";
import "./BigPot.css"
import fertilizer from '../../assets/images/fertilizante 1.png'
import watering from '../../assets/images/regadera (1) 1.png'

const BigPot = () => {
  return (
    
    <div className="bigpot-container">
      <div className='big-pot'>
      
      </div>
      <div className="pot-bton-container">
        <button id="feed" className="bigpot-bton">
          <img id="fertilizer" src= {fertilizer} alt="" />
        </button>
        <button id="spray" className="bigpot-bton">
          <img id="watering" src={watering} alt="" />
        </button>
      </div>
    </div>
    
  );
};

export default BigPot;