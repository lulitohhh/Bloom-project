import React from "react";
import "./ecoButton.css"
import ecobuton from '../../assets/images/ecobuton.png'

const EcoButton = () => {
  return (
    <button className='eco-button'>
      <img id="ecoimg" src={ecobuton} alt="" />
      <h1 id="ecobtontt">Ecoguide</h1>
    </button>
  );
};

export default EcoButton;