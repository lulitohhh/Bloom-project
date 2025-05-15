import React, { useState } from "react";
import "./ShopScreen.css";
import NavBar from "../../components/navBar/navBar";
import { doc, updateDoc, arrayUnion, increment, getDoc } from "firebase/firestore";
import coinImg from "/src/assets/images/Coin.png";
import { useShopItems } from "../../data/useShopData";
import { db } from "../../services/firebase/firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { subtractCoins} from "../../redux/coinSlice";
import { useEffect } from "react";

const ShopScreen = () => {
  const [category, setCategory] = useState("plants");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userPurchasedItems, setUserPurchasedItems] = useState([]);
  const dispatch = useDispatch();
  
  const coins = useSelector((state) => state.coins.coins);
  const userId = useSelector((state) => state.auth.user?.uid);
  
  const { shopItems, loading, error } = useShopItems();

  // Obtener los ítems comprados por el usuario al cargar el componente
  useEffect(() => {
    const fetchUserPurchasedItems = async () => {
      if (userId) {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserPurchasedItems(userDoc.data().purchasedItems || []);
        }
      }
    };
    
    fetchUserPurchasedItems();
  }, [userId]);

  const formatItems = {
    plants: shopItems.plants.map(plant => ({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      img: plant.image,
      purchased: userPurchasedItems.includes(plant.id) // Verifica si está en purchasedItems
    })),
    ecosystems: shopItems.ecosystems.map(eco => ({
      id: eco.id,
      name: eco.name,
      price: eco.price || 80,
      img: eco.image,
      purchased: userPurchasedItems.includes(eco.id)
    })),
    accessories: shopItems.accessories.map(acc => ({
      id: acc.id,
      name: acc.name,
      price: acc.price,
      img: acc.image,
      purchased: userPurchasedItems.includes(acc.id)
    }))
  };

  const handleBuy = async (item) => {
    if (!userId) {
      setAlertMessage("Por favor inicia sesión para realizar compras");
      setShowAlert(true);
      return;
    }

    if (userPurchasedItems.includes(item.id)) {
      setAlertMessage("¡Ya posees este artículo!");
      setShowAlert(true);
      return;
    }

    if (coins < item.price) {
      setAlertMessage(`¡No tienes suficientes monedas! Necesitas ${item.price - coins} monedas más.`);
      setShowAlert(true);
      return;
    }

    try {
      // Actualizar el usuario en Firestore
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        purchasedItems: arrayUnion(item.id),
        coins: increment(-item.price)
      });

      // Actualizar Redux y el estado local
      dispatch(subtractCoins(item.price));
      setUserPurchasedItems(prev => [...prev, item.id]);
      
      setAlertMessage(`¡Compra exitosa! Has adquirido ${item.name}`);
      setShowAlert(true);

    } catch (error) {
      console.error("Error en la compra:", error);
      setAlertMessage("Error al completar la compra. Por favor intenta nuevamente.");
      setShowAlert(true);
    }
  };

  // Resto del componente permanece igual...
  if (loading) {
    return (
      <div className="shop-container">
        <NavBar />
        <div className="loading-message">Cargando artículos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-container">
        <NavBar />
        <div className="error-message">
          Error al cargar la tienda: {error.message}
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <NavBar />

      {/* Alerta personalizada */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>{alertMessage}</p>
            <button 
              className="close-alert-btn"
              onClick={() => setShowAlert(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

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
            <div 
              key={item.id} 
              className={`item-card ${item.purchased ? "purchased" : ""}`}
            >
              <img 
                src={item.img} 
                alt={item.name} 
                className="item-img"
                onError={(e) => {
                  e.target.src = '/src/assets/images/default-item.png';
                }}
              />
              <h3>{item.name}</h3>
              <p>
                {item.price}{" "}
                <img src={coinImg} alt="moneda" className="coin-icon" />
              </p>
              <button 
                className={`buy-btn ${item.purchased ? "owned" : ""}`}
                onClick={() => handleBuy(item)}
                disabled={item.purchased}
              >
                {item.purchased ? "Adquirido" : "Comprar"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;