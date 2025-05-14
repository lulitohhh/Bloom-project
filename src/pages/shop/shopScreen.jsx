import React, { useState } from "react";
import "./ShopScreen.css";
import NavBar from "../../components/navBar/navBar";
import { plants } from "../../data/itemData";
import { ecosystems } from "../../data/itemData";
import { accessories } from "../../data/itemData";
import coinImg from "/src/assets/images/Coin.png";

const formatItems = {
  plants: plants.map((plant, index) => ({
    id: index + 1,
    name: plant.name,
    price: 50,
    img: plant.image,
  })),
  ecosystems: ecosystems.map((eco, index) => ({
    id: 100 + index,
    name: eco.name,
    price: 80,
    img: eco.image,
  })),
  accessories: accessories.map((acc, index) => ({
    id: 200 + index,
    name: acc.name,
    price: acc.price,
    img: acc.image,
  })),
};

const ShopScreen = () => {
  const [category, setCategory] = useState("plants");
  const [coins, setCoins] = useState(150);

  const handleBuy = (price) => {
    if (coins >= price) {
      setCoins(coins - price);
      alert("Purchase successful!");
    } else {
      alert("Not enough coins.");
    }
  };

  return (
    <div className="shop-container">
      <NavBar />

      <div className="shop-controls">
        <div className="category-tabs">
          {Object.keys(formatItems).map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        
      </div>
      <div className="container-shop">
        <div className="items-grid">
          {formatItems[category].map((item) => (
            <div key={item.id} className="item-card">
              <img src={item.img} alt={item.name} className="item-img" />
              <h3>{item.name}</h3>
              <p>
                {item.price}{" "}
                <img src={coinImg} alt="coin" className="coin-icon" />
              </p>
              <button className="BuyBtn" onClick={() => handleBuy(item.price)}>Buy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
