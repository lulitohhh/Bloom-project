import React from "react";
import "./pot.css"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import fertilizerImg from '../../assets/images/fertilizante.webp'
import wateringImg from '../../assets/images/wateringcan.webp'



const Pot = ({ plantData, isCentral, potIndex, onSelectCentralPot }) => {
  console.log(`Pot ${potIndex}: plantData =`, plantData); 
    console.log(`Pot ${potIndex}: isCentral =`, isCentral);
  const currentUser = useSelector(state => state.auth.user);
  // `growthProgress` ahora siempre se inicializa con el plantGrowth de la prop `plantData`
  const [growthProgress, setGrowthProgress] = useState(plantData?.plantGrowth || 0);
  const [resources, setResources] = useState({ water: 0, fertilizer: 0 });

  // Este useEffect se encarga de cargar los recursos del usuario
  useEffect(() => {
    const loadResourceData = async () => {
      if (!currentUser?.uid) return;

      const userRef = doc(db, 'users', currentUser.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setResources({
            water: userData.resources?.water || 0,
            fertilizer: userData.resources?.fertilizer || 0
          });
        } else {
          console.log("No se encontró el documento del usuario al cargar recursos de la maceta.");
        }
      } catch (error) {
        console.error("Error al cargar recursos de la maceta:", error);
      }
    };
    loadResourceData();
  }, [currentUser]); // Solo depende de currentUser

  // Este useEffect actualiza el estado local `growthProgress` cuando `plantData` cambia
  useEffect(() => {
    setGrowthProgress(plantData?.plantGrowth || 0);
  }, [plantData]); // Solo depende de plantData

  const handleWaterPlant = async () => {
    // Solo permitir regar si es la maceta central Y tiene datos de planta Y hay agua
    if (!isCentral || !plantData || resources.water <= 0) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const newProgress = Math.min(growthProgress + 10, 100);
      const newWater = resources.water - 1;

      // *** MODIFICACIÓN CLAVE: Actualiza el `plantGrowth` directamente en el array `plants`
      // y también `isMature` si la planta alcanza el 100% de crecimiento.
      const updates = {
        [`plants.${potIndex}.plantGrowth`]: newProgress, // Accede al índice específico del array `plants`
        "resources.water": newWater,
      };

      if (newProgress >= 100) {
        updates[`plants.${potIndex}.isMature`] = true; // Marca como madura en el índice correcto
      }

      await updateDoc(userRef, updates);

      // Actualizar el estado local
      setGrowthProgress(newProgress);
      setResources(prev => ({ ...prev, water: newWater }));

    } catch (error) {
      console.error("Error watering plant:", error);
    }
  };

  const handleFertilizePlant = async () => {
    // Solo permitir fertilizar si es la maceta central Y tiene datos de planta Y hay fertilizante
    if (!isCentral || !plantData || resources.fertilizer <= 0) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const newProgress = Math.min(growthProgress + 20, 100);
      const newFertilizer = resources.fertilizer - 1;

      // *** MODIFICACIÓN CLAVE: Actualiza el `plantGrowth` directamente en el array `plants`
      // y también `isMature` si la planta alcanza el 100% de crecimiento.
      const updates = {
        [`plants.${potIndex}.plantGrowth`]: newProgress, // Accede al índice específico del array `plants`
        "resources.fertilizer": newFertilizer,
      };

      if (newProgress >= 100) {
        updates[`plants.${potIndex}.isMature`] = true; // Marca como madura en el índice correcto
      }

      await updateDoc(userRef, updates);

      // Actualizar el estado local
      setGrowthProgress(newProgress);
      setResources(prev => ({ ...prev, fertilizer: newFertilizer }));

    } catch (error) {
      console.error("Error fertilizing plant:", error);
    }
  };

  const getPlantImage = () => {
    if (!plantData) return null;

    // `currentProgress` siempre viene del estado local `growthProgress`
    // porque es la planta central la que estamos mostrando y su progreso es el que controlamos.
    const currentProgress = growthProgress;

    if (plantData.isMature || currentProgress >= 100) {
      return plantData.matureImage || plantData.image;
    } else if (currentProgress >= 50) {
      return plantData.mediumImage || plantData.sproutImage || plantData.image;
    }
    return plantData.sproutImage || plantData.image;
  };

  return (
    <div
      className={`pot-container ${isCentral ? 'pot-central' : 'pot-background'}`}
      // Solo permite seleccionar si NO es la central y si tiene una planta
      onClick={!isCentral && plantData ? () => onSelectCentralPot(potIndex) : null}
    >
      <div className={`pot-bg ${isCentral ? 'big-pot-bg' : 'small-pot-bg'}`}>
        {plantData ? (
          <>
            <img
              id="main-plant"
              src={getPlantImage()}
              alt={plantData.name}
              className="pot-plant-img"
            />
            {isCentral && ( // Solo muestra la barra de progreso si es la maceta central
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${growthProgress}%` }}
                ></div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-pot">{isCentral ? "Vacío" : ""}</div>
        )}
      </div>

      {isCentral && plantData && ( // Solo muestra los botones si es la maceta central Y tiene planta
        <div className="pot-bton-container">
          <button
            id="feed"
            className="pot-bton"
            onClick={handleFertilizePlant}
            disabled={resources.fertilizer <= 0}
          >
            <img id="fertilizer" src={fertilizerImg} alt="Fertilizar" />
            <span>{resources.fertilizer}</span>
          </button>
          <button
            id="spray"
            className="pot-bton"
            onClick={handleWaterPlant}
            disabled={resources.water <= 0}
          >
            <img id="watering" src={wateringImg} alt="Regar" />
            <span>{resources.water}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pot;