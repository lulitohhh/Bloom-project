import React from "react";
import "./profileBton.css"
import profIcon from '../../assets/images/prof icon.png'


const ProfileBton = () => {
  return (
    <button className='prof-button'>
      
      <img id="profIcon" src={profIcon} alt="" />
    </button>
  );
};

export default ProfileBton;