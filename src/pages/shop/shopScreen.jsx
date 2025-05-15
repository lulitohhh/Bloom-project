import React, { useState } from "react";
import "./ShopScreen.css";
import NavBar from "../../components/navBar/navBar";
import { doc, updateDoc, arrayUnion, increment, getDoc } from "firebase/firestore";
import coinImg from "/src/assets/images/Coin.webp";
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
    plants: shopItems.plants?.map(plant => ({
      ...plant,
      img: plant.image,
      purchased: userPurchasedItems.includes(plant.id)
    })) || [],
    ecosystems: shopItems.ecosystems?.map(eco => ({
      ...eco,
      img: eco.image,
      purchased: userPurchasedItems.includes(eco.id)
    })) || [],
    accessories: shopItems.accessories?.map(acc => ({
      ...acc,
      img: acc.image,
      purchased: userPurchasedItems.includes(acc.id)
    })) || []
  };

  
  const handleBuy = async (item) => {
  if (!userId) {
    showAlertMessage("Por favor inicia sesión para realizar compras");
    return;
  }

  const isResource = item.id === "watering_can" || item.id === "fertilizer";

  if (!isResource && userPurchasedItems.includes(item.id)) {
    showAlertMessage("¡Ya posees este artículo!");
    return;
  }

  if (coins < item.price) {
    showAlertMessage(`¡No tienes suficientes monedas! Necesitas ${item.price - coins} monedas más.`);
    return;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return;
    const userData = userDoc.data();

    if (isResource) {
      
      const resourceName = item.id === "watering_can" ? "water" : "fertilizer";
      await updateDoc(userRef, {
        [`resources.${resourceName}`]: increment(1)
      });
      dispatch(subtractCoins(item.price));
      showAlertMessage(`¡Compra exitosa! Has adquirido 1 unidad de ${item.name}`);
    } else {
      
      if (category === "plants") {
        const hasSpace = !userData.bigPotPlant ||
                          (userData.potPlants || [null, null]).some(pot => pot === null);

        if (!hasSpace) {
          showAlertMessage("¡No tienes espacio para más plantas!");
          return;
        }
      }

      await updateDoc(userRef, {
        purchasedItems: arrayUnion(item.id),
        coins: increment(-item.price),
        ...(category === "plants" && getPlantUpdateData(item, userData))
      });

      dispatch(subtractCoins(item.price));
      setUserPurchasedItems(prev => [...prev, item.id]);
      showAlertMessage(`¡Compra exitosa! Has adquirido ${item.name}`);
    }

  } catch (error) {
    console.error("Error en la compra:", error);
    showAlertMessage("Error al completar la compra. Por favor intenta nuevamente.");
  }
};

  
  const getPlantUpdateData = (plantItem, userData) => {
    const plantData = {
      id: plantItem.id,
      name: plantItem.name,
      image: plantItem.image,        
      sproutImage: "/assets/brote.png",   
      matureImage: plantItem.image,   
      isMature: false,
      purchasedAt: new Date(),
      
      ...(plantItem.description && { description: plantItem.description }),
      ...(plantItem.genus && { genus: plantItem.genus }),
      ...(plantItem.habitat && { habitat: plantItem.habitat })
    };

    
    if (!userData.bigPotPlant) {
      return {
        bigPotPlant: plantData,
        plantGrowth: 0,
        potPlants: userData.potPlants || [null, null] // Inicializa si no existe
      };
    } else {
      const emptyPotIndex = (userData.potPlants || [null, null]).findIndex(pot => pot === null);
      if (emptyPotIndex !== -1) {
        return {
          [`potPlants.${emptyPotIndex}`]: plantData
        };
      }
    }
    return {};
  };

  // Muestra alerta con mensaje
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

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
              className={`item-card ${item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" ? "purchased" : ""}`}
            >
              {item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" && (
                <span className="purchased-badge">ADQUIRIDO</span>
              )}

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
                {item.price} <img src={coinImg} alt="moneda" className="coin-icon" />
              </p>

              <button
                className={`buy-btn ${item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" ? "owned" : ""}`}
                onClick={() => handleBuy(item)}
                disabled={item.purchased && item.id !== "watering_can" && item.id !== "fertilizer"}
              >
                {item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" ? "Adquirido" : "Comprar"}
              </button>

              {item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" && <div className="purchased-overlay"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;