import React from "react";
import { useNavigate } from "react-router-dom";
import "./shopBton.css"
import cloudinaryImages from '../../utils/cloudinaryImages';


const ShopBton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/shop");
  };
  return (
<button className='shop-button' onClick={handleClick}>
  <img id="shopIcon" src={cloudinaryImages.shopicon} alt="Shop" />
</button>

  );
};

export default ShopBton;
