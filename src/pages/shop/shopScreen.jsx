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

  // Obtener los ítems comprados por el usuario
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

  // Formatear items para mostrar
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

  // Función para comprar un ítem
  const handleBuy = async (item) => {
    if (!userId) {
      showAlertMessage("Por favor inicia sesión para realizar compras");
      return;
    }

    if (userPurchasedItems.includes(item.id)) {
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

      // Lógica específica para plantas
      if (category === "plants") {
        const userData = userDoc.data();
        const hasSpace = !userData.bigPotPlant || 
                       (userData.potPlants || [null, null]).some(pot => pot === null);
        
        if (!hasSpace) {
          showAlertMessage("¡No tienes espacio para más plantas!");
          return;
        }
      }

      // Actualización atómica en Firestore
      await updateDoc(userRef, {
        purchasedItems: arrayUnion(item.id),
        coins: increment(-item.price),
        ...(category === "plants" && getPlantUpdateData(item, userDoc.data()))
      });

      // Actualizar Redux y estado local
      dispatch(subtractCoins(item.price));
      setUserPurchasedItems(prev => [...prev, item.id]);
      showAlertMessage(`¡Compra exitosa! Has adquirido ${item.name}`);

    } catch (error) {
      console.error("Error en la compra:", error);
      showAlertMessage("Error al completar la compra. Por favor intenta nuevamente.");
    }
  };

  // Genera los datos de actualización para plantas
  const getPlantUpdateData = (plantItem, userData) => {
    const plantData = {
      id: plantItem.id,
      name: plantItem.name,
      image: plantItem.image,        // Mantiene tu campo original
      sproutImage: plantItem.image,  // Usa la misma imagen por defecto
      matureImage: plantItem.image,  // Puedes cambiarlo después
      isMature: false,
      purchasedAt: new Date(),
      // Copia campos descriptivos automáticamente
      ...(plantItem.description && { description: plantItem.description }),
      ...(plantItem.genus && { genus: plantItem.genus }),
      ...(plantItem.habitat && { habitat: plantItem.habitat })
    };

    // Decide dónde colocar la planta
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
              className={`item-card ${item.purchased ? "purchased" : ""}`}
            >
              {item.purchased && (
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
                className={`buy-btn ${item.purchased ? "owned" : ""}`}
                onClick={() => handleBuy(item)}
                disabled={item.purchased}
              >
                {item.purchased ? "Adquirido" : "Comprar"}
              </button>

              {item.purchased && <div className="purchased-overlay"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;