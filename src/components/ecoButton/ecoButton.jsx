import React from "react";
import { useNavigate } from 'react-router-dom';
import "./ecoButton.css";
import ecobuton from '../../assets/images/ecobuton.png';

const EcoButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/garden'); // Navega a la ruta /garden
  };

  return (
    <button className='eco-button' onClick={handleClick}>
      <img id="ecoimg" src={ecobuton} alt="Ecoguide" />
      <h1 id="ecobtontt">Ecoguide</h1>
    </button>
  );
};

export default EcoButton;