import React from "react";
import "./navBar.css"
import BackButton from "../backBton/BackBton";
import ShopBton from "../shopBton/shopBton";
import LvlBar from "../lvlbar/lvlbar";
import ProfileBton from "../profileBton/profileBton";

const NavBar = () => {
  return (
    <div className="navBar">
        <div className="leftup">
          <BackButton/>
          <ShopBton/>
        </div>
        <div className="rightup">
          <LvlBar/>
          <ProfileBton/>
        </div>
      </div>
  );
};

export default NavBar;