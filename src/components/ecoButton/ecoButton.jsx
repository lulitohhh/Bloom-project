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
    <button className='eco-button' aria-label="Go to the ecoguide screen" onClick={handleClick}>
      <img id="ecoimg" src={ecobuton} alt="Ecoguide" />
      <h1 id="ecobtontt">Ecoguide</h1>
    </button>
  );
};

export default EcoButton;