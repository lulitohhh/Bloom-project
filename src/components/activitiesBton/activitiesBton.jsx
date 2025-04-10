import React from "react";
import { useNavigate } from "react-router-dom";
import "./activitiesBton.css"


const ActivitiesBton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/activities'); // Navega a la ruta /activities
  };

  return (
       <button className='act-button' onClick={handleClick}>
      <h1 id="activitext">Play activities!</h1>
    </button>
  );
};

export default ActivitiesBton;