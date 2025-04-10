import React from "react";
import "./lvlbar.css"
import lvlIndicator from '../../assets/images/lvl indicator.png'


const LvlBar = () => {
  return (
    <div className='lvl-bar'>
      
      <img id="lvlIndicator" src={lvlIndicator} alt="" />
      
    </div>
  );
};

export default LvlBar;