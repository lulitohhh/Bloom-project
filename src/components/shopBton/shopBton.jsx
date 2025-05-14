import React from "react";
import { useNavigate } from "react-router-dom";
import "./shopBton.css"
import shopIcon from '../../assets/images/shop icon.png'


const ShopBton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/shop");
  };
  return (
<button className='shop-button' onClick={handleClick}>
  <img id="shopIcon" src={shopIcon} alt="Shop" />
</button>

  );
};

export default ShopBton;