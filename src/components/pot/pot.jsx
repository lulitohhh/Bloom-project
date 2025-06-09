import React from "react";
import "./pot.css"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import cloudinaryImages from '../../utils/cloudinaryImages';
import { motion as Motion } from "framer-motion";
const Pot = ({ plantData, potIndex, onSelectCentralPot, isCentral, className }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [resources, setResources] = useState({ water: 0, fertilizer: 0 });
  const [growthProgress, setGrowthProgress] = useState(plantData?.plantGrowth || 0);
  const [showGrowthAlert, setShowGrowthAlert] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [alertDataLoaded, setAlertDataLoaded] = useState(false);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const loadData = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setResources({
          water: userData.resources?.water || 0,
          fertilizer: userData.resources?.fertilizer || 0,
        });

        const currentPlants = Array.isArray(userData.plants) ? userData.plants : [];
        const currentPlant = currentPlants.find(p => p?.id === plantData?.id);
        setHasShownAlert(currentPlant?.hasShownAlert || false);
        setAlertDataLoaded(true);
      }
    };

    loadData();
  }, [currentUser, plantData?.id]);

  useEffect(() => {
    if (!alertDataLoaded) return;

    setGrowthProgress(plantData?.plantGrowth || 0);

    if (plantData?.plantGrowth === 100 && !hasShownAlert) {
      setShowGrowthAlert(true);
    }

    if (plantData?.plantGrowth < 100) {
      setShowGrowthAlert(false);
    }
  }, [plantData, hasShownAlert, alertDataLoaded]);

  const updateGrowth = async (increment, resourceType) => {
    if (!plantData || !isCentral || resources[resourceType] <= 0) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) return;

      const userData = docSnap.data();
      const currentPlants = Array.isArray(userData.plants) ? [...userData.plants] : [];

      const index = currentPlants.findIndex((p) => p?.id === plantData.id);
      if (index === -1) return;

      const currentPlant = currentPlants[index];
      const prevProgress = currentPlant.plantGrowth || 0;
      const newProgress = Math.min(prevProgress + increment, 100);
      const isNewlyMature = newProgress === 100 && !currentPlant.hasShownAlert;

      const updatedPlant = {
        ...currentPlant,
        plantGrowth: newProgress,
        isMature: newProgress >= 100,
        ...(isNewlyMature ? { hasShownAlert: true } : {}),
      };

      currentPlants[index] = updatedPlant;

      await updateDoc(userRef, {
        plants: currentPlants,
        [`resources.${resourceType}`]: resources[resourceType] - 1,
      });

      setResources((prev) => ({
        ...prev,
        [resourceType]: prev[resourceType] - 1,
      }));

      setGrowthProgress(newProgress);

      if (isNewlyMature) {
        setShowGrowthAlert(true);
        setHasShownAlert(true);
      }
    } catch (error) {
      console.error("Error actualizando progreso:", error);
    }
  };

  const handleWaterPlant = () => updateGrowth(10, "water");
  const handleFertilizePlant = () => updateGrowth(20, "fertilizer");

  const getPlantImage = () => {
    if (!plantData) return null;
    if (plantData.isMature || growthProgress >= 100) return plantData.matureImage || plantData.image;
    if (growthProgress >= 50) return plantData.mediumImage || plantData.sproutImage || plantData.image;
    return plantData.sproutImage || plantData.image;
  };

  return (
    <Motion.div
      className={`pot-container ${className} ${isCentral ? "pot-central" : "pot-background"}`}
      onClick={!isCentral && plantData ? () => onSelectCentralPot(potIndex) : null}
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
            {isCentral && growthProgress < 100 && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${growthProgress}%` }}></div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-pot">{isCentral ? "Vacío" : ""}</div>
        )}
      </div>

      {isCentral && plantData && growthProgress < 100 && (
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

      {isCentral && plantData && showGrowthAlert && !hasShownAlert && (
        <div className="alert-overlay2">
          <div className="alert-box">
            <p>¡Tu {plantData.name} ha crecido!</p>
            <button className="close-alert-btn" onClick={() => setShowGrowthAlert(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </Motion.div>
  );
};

export default Pot;