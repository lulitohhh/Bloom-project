import React from "react";
import "./BackBton.css"
import { useNavigate } from "react-router-dom";


const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); 
  };

  return (
       <button className='back-button' onClick={handleClick}>
      
    </button>
  );
};

export default BackButton;