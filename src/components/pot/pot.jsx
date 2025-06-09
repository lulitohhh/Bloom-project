import React from "react";
import "./pot.css"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import cloudinaryImages from '../../utils/cloudinaryImages';


const Pot = ({ plantData, isCentral, potIndex, onSelectCentralPot, className }) => {
  const currentUser = useSelector((state) => state.auth.user);

  const [resources, setResources] = useState({ water: 0, fertilizer: 0 });
  const [growthProgress, setGrowthProgress] = useState(plantData?.plantGrowth || 0);

  useEffect(() => {
    if (isCentral && plantData?.plantGrowth !== undefined) {
      setGrowthProgress(plantData.plantGrowth);
    }
  }, [plantData, isCentral]);

  useEffect(() => {
    const loadResourceData = async () => {
      if (!currentUser?.uid) return;

      const userRef = doc(db, "users", currentUser.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setResources({
            water: userData.resources?.water || 0,
            fertilizer: userData.resources?.fertilizer || 0,
          });
        }
      } catch (error) {
        console.error("Error al cargar recursos:", error);
      }
    };
    loadResourceData();
  }, [currentUser]);

  const refreshPlantProgress = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        const updatedData = updatedSnap.data();
        const centralPlantId = updatedData.centralPlantId;
        const updatedPlant = updatedData.plants?.find(p => p?.id === centralPlantId);
        if (updatedPlant) {
          setGrowthProgress(updatedPlant.plantGrowth || 0);
        }
      }
    } catch (error) {
      console.error("Error al refrescar progreso:", error);
    }
  };

  const handleWaterPlant = async () => {
    if (!isCentral || !plantData || resources.water <= 0) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) return;

      const userData = docSnap.data();
      const currentPlants = Array.isArray(userData.plants) ? [...userData.plants] : [null, null, null];
      const centralPlantId = userData.centralPlantId;

      const foundIndex = currentPlants.findIndex((p) => p?.id === centralPlantId);
      if (foundIndex === -1) return;

      const currentPlant = currentPlants[foundIndex];
      const prevProgress = currentPlant.plantGrowth || 0;
      const newProgress = Math.min(prevProgress + 10, 100);
      const newWater = resources.water - 1;

      const updatedPlant = { ...currentPlant, plantGrowth: newProgress };
      if (newProgress >= 100) updatedPlant.isMature = true;

      currentPlants[foundIndex] = updatedPlant;

      await updateDoc(userRef, {
        plants: currentPlants,
        "resources.water": newWater,
      });

      setResources((prev) => ({ ...prev, water: newWater }));
      await refreshPlantProgress();
    } catch (error) {
      console.error("Error al regar planta:", error);
    }
  };

  const handleFertilizePlant = async () => {
    if (!isCentral || !plantData || resources.fertilizer <= 0) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) return;

      const userData = docSnap.data();
      const currentPlants = Array.isArray(userData.plants) ? [...userData.plants] : [null, null, null];
      const centralPlantId = userData.centralPlantId;

      const foundIndex = currentPlants.findIndex((p) => p?.id === centralPlantId);
      if (foundIndex === -1) return;

      const currentPlant = currentPlants[foundIndex];
      const prevProgress = currentPlant.plantGrowth || 0;
      const newProgress = Math.min(prevProgress + 20, 100);
      const newFertilizer = resources.fertilizer - 1;

      const updatedPlant = { ...currentPlant, plantGrowth: newProgress };
      if (newProgress >= 100) updatedPlant.isMature = true;

      currentPlants[foundIndex] = updatedPlant;

      await updateDoc(userRef, {
        plants: currentPlants,
        "resources.fertilizer": newFertilizer,
      });

      setResources((prev) => ({ ...prev, fertilizer: newFertilizer }));
      await refreshPlantProgress();
    } catch (error) {
      console.error("Error al fertilizar planta:", error);
    }
  };

  const getPlantImage = () => {
    if (!plantData) return null;

    if (plantData.isMature || growthProgress >= 100) {
      return plantData.matureImage || plantData.image;
    } else if (growthProgress >= 50) {
      return plantData.mediumImage || plantData.sproutImage || plantData.image;
    }
    return plantData.sproutImage || plantData.image;
  };

  return (
    <div
      className={`pot-container ${className} ${isCentral ? "pot-central" : "pot-background"}`}
      onClick={!isCentral && plantData ? () => onSelectCentralPot(potIndex) : null}
    >
      <div className={`pot-bg ${isCentral ? "big-pot-bg" : "small-pot-bg"}`}>
        {plantData ? (
          <>
            <img
              id="main-plant"
              src={getPlantImage()}
              alt={plantData.name}
              className="pot-plant-img"
            />
            {isCentral && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${growthProgress}%` }}></div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-pot">{isCentral ? "Vacío" : ""}</div>
        )}
      </div>

      {isCentral && plantData && (
        <div className="pot-bton-container">
          <button
            id="feed"
            className="pot-bton"
            onClick={handleFertilizePlant}
            disabled={resources.fertilizer <= 0}
          >
            <img id="fertilizer" src={cloudinaryImages.fertilizer} alt="Fertilizar" />
            <span>{resources.fertilizer}</span>
          </button>
          <button
            id="spray"
            className="pot-bton"
            onClick={handleWaterPlant}
            disabled={resources.water <= 0}
          >
            <img id="watering" src={cloudinaryImages.wateringcan2} alt="Regar" />
            <span>{resources.water}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pot;