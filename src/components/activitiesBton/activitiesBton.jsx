<<<<<<< HEAD
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

=======
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

>>>>>>> 4c7bfd8333749cfd766eee20c721bdf54c2e6768
export default ActivitiesBton;