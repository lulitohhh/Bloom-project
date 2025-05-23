import React from "react";
import { useNavigate } from 'react-router-dom';
import "./ecoButton.css";
import ecobuton from '../../assets/images/ecobuton.webp';

const EcoButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/garden'); 
  };

  return (
    <button className='eco-button' aria-label="Go back to the previous screen"onClick={handleClick}>
      <img className="eco-icon" src={ecobuton} alt="" aria-hidden="true"/>
      <span id="ecobutton">Ecoguide</span>
    </button>
  );
};

export default EcoButton;