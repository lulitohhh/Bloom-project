import React from "react";
import "./BigPot.css"
import fertilizer from '../../assets/images/fertilizante 1.webp'
import watering from '../../assets/images/regadera (1) 1.webp'
import { useSelector } from "react-redux";
import { useState } from "react";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../services/firebase/firebaseConfig";

const BigPot = () => {
  const currentUser = useSelector(state => state.auth.user);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [growthProgress, setGrowthProgress] = useState(0);
  const [resources, setResources] = useState({ water: 0, fertilizer: 0 });


  useEffect(() => {
    const loadPlantData = async () => {
      if (!currentUser?.uid) return;

      const userRef = doc(db, 'users', currentUser.uid);
      try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setCurrentPlant(userData.bigPotPlant || null);
          setGrowthProgress(userData.plantGrowth || 0);
          setResources({
            water: userData.resources?.water || 0,
            fertilizer: userData.resources?.fertilizer || 0
          });
        } else {
          console.log("No se encontró el documento del usuario al cargar datos de BigPot.");
        }
      } catch (error) {
        console.error("Error al cargar datos de la planta grande:", error);
      }
    };

    loadPlantData();
  }, [currentUser]);

  const handleWaterPlant = async () => {
    if (resources.water <= 0 || !currentPlant) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const newProgress = Math.min(growthProgress + 10, 100);
      const newWater = resources.water - 1;

      await updateDoc(userRef, {
        "plantGrowth": newProgress,
        "resources.water": newWater,
        ...(newProgress === 100 && { "bigPotPlant.isMature": true })
      });

      setGrowthProgress(newProgress);
      setResources(prev => ({ ...prev, water: newWater }));

    } catch (error) {
      console.error("Error watering plant:", error);
    }
  };  

  const handleFertilizePlant = async () => {
    if (resources.fertilizer <= 0 || !currentPlant) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const newProgress = Math.min(growthProgress + 20, 100);
      const newFertilizer = resources.fertilizer - 1;

      await updateDoc(userRef, {
        "plantGrowth": newProgress,
        "resources.fertilizer": newFertilizer,
        ...(newProgress === 100 && { "bigPotPlant.isMature": true })
      });

      setGrowthProgress(newProgress);
      setResources(prev => ({ ...prev, fertilizer: newFertilizer }));

    } catch (error) {
      console.error("Error fertilizing plant:", error);
    }
  };

  const getPlantImage = () => {
    if (!currentPlant) return null;

    // Prioridad: matureImage/sproutImage -> image (fallback)
    if (currentPlant.isMature || growthProgress >= 100) {
      return currentPlant.matureImage || currentPlant.image;
    } else if (growthProgress >= 50) {
      return currentPlant.mediumImage || currentPlant.sproutImage || currentPlant.image;
    }
    return currentPlant.sproutImage || currentPlant.image;
  };

  return (
    <div className="bigpot-container">
      <div className='big-pot'>
        {currentPlant ? (
          <>
            <img
              id="main-plant"
              src={getPlantImage()}
              alt={currentPlant.name}
            />
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${growthProgress}%` }}
              ></div>
            </div>
          </>
        ) : (
          <div className="empty-pot">Vacío</div>
        )}
      </div>
      <div className="pot-bton-container">
        <button
          id="feed"
          className="bigpot-bton"
          onClick={handleFertilizePlant}
          disabled={!currentPlant || resources.fertilizer <= 0}
        >
          <img id="fertilizer" src={fertilizer} alt="Fertilizar" />
          <span>{resources.fertilizer}</span>
        </button>
        <button
          id="spray"
          className="bigpot-bton"
          onClick={handleWaterPlant}
          disabled={!currentPlant || resources.water <= 0}
        >
          <img id="watering" src={watering} alt="Regar" />
          <span>{resources.water}</span>
        </button>
      </div>
    </div>
  );
};

export default BigPot;