import React from "react";
import "./profileBton.css"
import cloudinaryImages from '../../utils/cloudinaryImages';
import { useNavigate } from "react-router-dom";



const ProfileBton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/perfil'); 
  };
  return (
    <button className='prof-button' aria-label="Go back to the profile screen"  onClick={handleClick}>
      
      <img id="profIcon" src={cloudinaryImages.profIcon} alt="" />
    </button>
  );
};

export default ProfileBton;
