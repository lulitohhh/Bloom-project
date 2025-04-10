import React from "react";
import "./shopBton.css"
import shopIcon from '../../assets/images/shop icon.png'


const ShopBton = () => {
  return (
    <button className='shop-button'>
      
      <img id="shopIcon" src={shopIcon} alt="" />
    </button>
  );
};

export default ShopBton;