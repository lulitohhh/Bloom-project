  import React, { useState } from "react";
  import "./shopScreen.css";
  import NavBar from "../../components/navBar/navBar";
  import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
  import cloudinaryImages from '../../utils/cloudinaryImages';
  import { useShopItems } from "../../data/useShopData";
  import { db } from "../../services/firebase/firebaseConfig";
  import { useSelector, useDispatch } from "react-redux";
  import { subtractCoins} from "../../redux/coinSlice";
  import { useEffect } from "react";
  import { getAuth } from "firebase/auth";
  import { createUserProfile } from "../../services/firebase/userService";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant";

const ShopScreen = () => {
  const [category, setCategory] = useState("plants");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userDataFromFirebase, setUserDataFromFirebase] = useState(null);
  

  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.coins);
  const userId = useSelector((state) => state.auth.user?.uid);
  const auth = getAuth();

  const { shopItems, loading, error } = useShopItems();

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) {
        setUserDataFromFirebase(null);
        return;
      }

      const userRef = doc(db, "users", userId);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          data.purchasedPlants ??= [];
          data.purchasedEcosystems ??= [];
          setUserDataFromFirebase(data);
        } else {
          await createUserProfile(auth.currentUser);
          const newDocSnap = await getDoc(userRef);
          const newData = newDocSnap.data();
          newData.purchasedPlants ??= [];
          newData.purchasedEcosystems ??= [];
          setUserDataFromFirebase(newData);
        }
      } catch (err) {
        console.error("ShopScreen: Error al cargar o crear datos del usuario:", err);
        setUserDataFromFirebase(null);
      }
    };
    loadUserData();
  }, [userId, auth]);

  const formattedItems = {
    plants: shopItems.plants?.map((plant) => ({
      ...plant,
      img: plant.image,
      purchased: userDataFromFirebase?.purchasedItems?.includes(plant.id) || false,
    })) || [],
    ecosystems: shopItems.ecosystems?.map((eco) => ({
      ...eco,
      img: eco.image,
      purchased: userDataFromFirebase?.purchasedItems?.includes(eco.id) || false,
    })) || [],
    accessories: shopItems.accessories?.map((acc) => ({
      ...acc,
      img: acc.image,
      purchased: userDataFromFirebase?.purchasedItems?.includes(acc.id) || false,
    })) || [],
  };

  const handleBuy = async (item) => {
    if (!userId || !userDataFromFirebase) {
      showAlertMessage("Por favor inicia sesión o espera a que los datos se carguen.");
      return;
    }

    const isResource = item.id === "watering_can" || item.id === "fertilizer";
    const isExtraPot = item.id === "flower_pots";
    const alreadyPurchased = userDataFromFirebase.purchasedItems?.includes(item.id);
    const currentPotCount = userDataFromFirebase.pots || 3;

    if (!isResource && !isExtraPot && alreadyPurchased) {
      showAlertMessage("¡Ya posees este artículo!");
      return;
    }

    if (isExtraPot && currentPotCount >= 9) {
      showAlertMessage("¡Ya tienes el máximo de 9 macetas!");
      return;
    }

    if (coins < item.price) {
      showAlertMessage(`¡No tienes suficientes monedas! Necesitas ${item.price - coins} monedas más.`);
      return;
    }

    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        showAlertMessage("Error: Documento de usuario no encontrado al intentar comprar.");
        return;
      }

      const currentData = docSnap.data();
      const currentPlantsInPots = Array.isArray(currentData.plants) ? [...currentData.plants] : [];
      const currentPurchasedItems = Array.isArray(currentData.purchasedItems) ? [...currentData.purchasedItems] : [];
      const currentPurchasedPlants = Array.isArray(currentData.purchasedPlants) ? [...currentData.purchasedPlants] : [];
      const currentPurchasedEcosystems = Array.isArray(currentData.purchasedEcosystems) ? [...currentData.purchasedEcosystems] : [];

      const totalPots = currentData.pots || 3;
      while (currentPlantsInPots.length < totalPots) {
        currentPlantsInPots.push(null);
      }

      let updates = { coins: increment(-item.price) };

      if (isResource) {
        const resourceName = item.id === "watering_can" ? "water" : "fertilizer";
        updates[`resources.${resourceName}`] = increment(1);
      } else if (isExtraPot) {
        const newPotCount = Math.min(currentPotCount + 1, 9);
        updates.pots = newPotCount;

        setUserDataFromFirebase((prev) => ({
          ...prev,
          pots: newPotCount,
        }));
      } else if (category === "plants") {
        const emptyPotIndex = currentPlantsInPots.indexOf(null);
        if (emptyPotIndex !== -1) {
          const plantData = {
            id: item.id,
            name: item.name,
            image: item.image,
            sproutImage: item.sproutImage || "/assets/brote.png",
            mediumImage: item.mediumImage || item.image,
            matureImage: item.matureImage || item.image,
            isMature: false,
            purchasedAt: new Date(),
            plantGrowth: 0,
            ...(item.description && { description: item.description }),
            ...(item.genus && { genus: item.genus }),
            ...(item.habitat && { habitat: item.habitat }),
          };

          currentPlantsInPots[emptyPotIndex] = plantData;
          currentPurchasedPlants.push(plantData);
          currentPurchasedItems.push(item.id);

          updates.plants = currentPlantsInPots;
          updates.purchasedPlants = currentPurchasedPlants;
          updates.purchasedItems = currentPurchasedItems;

          setUserDataFromFirebase((prev) => ({
            ...prev,
            plants: currentPlantsInPots,
            purchasedPlants: currentPurchasedPlants,
            purchasedItems: [...(prev.purchasedItems || []), item.id],
          }));
        } else {
          showAlertMessage("¡No tienes macetas vacías disponibles para nuevas plantas!");
          return;
        }
      } else if (category === "ecosystems") {
        const ecoData = {
          id: item.id,
          name: item.name,
          image: item.image,
          ...(item.description && { description: item.description }),
        };

        currentPurchasedEcosystems.push(ecoData);
        currentPurchasedItems.push(item.id);

        updates.purchasedEcosystems = currentPurchasedEcosystems;
        updates.purchasedItems = currentPurchasedItems;

        setUserDataFromFirebase((prev) => ({
          ...prev,
          purchasedEcosystems: currentPurchasedEcosystems,
          purchasedItems: [...(prev.purchasedItems || []), item.id],
        }));
      } else {
        currentPurchasedItems.push(item.id);
        updates.purchasedItems = currentPurchasedItems;

        setUserDataFromFirebase((prev) => ({
          ...prev,
          purchasedItems: [...(prev.purchasedItems || []), item.id],
        }));
      }

      await updateDoc(userRef, updates);
      dispatch(subtractCoins(item.price));
      showAlertMessage(`¡Compra exitosa! Has adquirido ${item.name}`);
    } catch (error) {
      console.error("Error en la compra:", error);
      showAlertMessage("Error al completar la compra. Por favor intenta nuevamente.");
    }
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  if (loading || !userDataFromFirebase) {
    return (
      <LoaderPlant></LoaderPlant>
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

      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>{alertMessage}</p>
            <button className="close-alert-btn" onClick={() => setShowAlert(false)}>
              Aceptar
            </button>
          </div>
        </div>
      )}

      <div className="shop-controls">
        <div className="category-tabs">
          {Object.keys(formattedItems).map((cat) => (
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
          {formattedItems[category].map((item) => (
            <div
              key={item.id}
              className={`item-card ${
                item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" ? "purchased" : ""
              }`}
            >
              {item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" && (
                <span className="purchased-badge">ADQUIRIDO</span>
              )}

              <img
                src={item.img}
                alt={item.name}
                className="item-img"
                onError={(e) => {
                  e.target.src = "/src/assets/images/default-item.png";
                }}
              />

              <h3>{item.name}</h3>
              <p>
                {item.price} <img src={cloudinaryImages.Coin} alt="moneda" className="coin-icon" />
              </p>

              <button
                className={`buy-btn ${
                  item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" ? "owned" : ""
                }`}
                onClick={() => handleBuy(item)}
                disabled={item.purchased && item.id !== "watering_can" && item.id !== "fertilizer"}
              >
                {item.purchased && item.id !== "watering_can" && item.id !== "fertilizer"
                  ? "Adquirido"
                  : "Comprar"}
              </button>

              {item.purchased && item.id !== "watering_can" && item.id !== "fertilizer" && (
                <div className="purchased-overlay"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
