import React from "react";
import { useNavigate } from "react-router-dom";
import "./activitiesBton.css"


const ActivitiesBton = () => {
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate('/activities'); 
  };

  return (
    <>
       <button className='act-button' onClick={handleNavigateClick}>
      <h1 id="activitext">Play activities!</h1>
    </button>
    </>
  );
};

export default ActivitiesBton;