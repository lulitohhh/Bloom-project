import React from "react";
import "./BackBton.css"
import { useNavigate } from "react-router-dom";


const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard'); 
  };

  return (
       <button className='back-button' aria-label="Go back to the dasboard screen" onClick={handleClick}>
      
    </button>
  );
};

export default BackButton;