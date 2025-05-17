import React from "react";
import "./profileBton.css"
import profIcon from '../../assets/images/prof icon.webp'


const ProfileBton = () => {
  return (
    <button className='prof-button' aria-label="Go back to the profile screen">
      
      <img id="profIcon" src={profIcon} alt="" />
    </button>
  );
};

export default ProfileBton;