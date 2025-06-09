
import React from 'react';

import "./dashboard.css"
import Background from '../../components/background/background';
import BigPot from '../../components/BigPot/BigPot';
import Pot from '../../components/pot/pot';
import EcoButton from '../../components/ecoButton/ecoButton';
import ActivitiesBton from '../../components/activitiesBton/activitiesBton';

import BackButton from '../../components/backBton/BackBton';
import ShopBton from '../../components/shopBton/shopBton';
import ProfileBton from '../../components/profileBton/profileBton';
import CoinCounter from '../../components/Coin/Coin';
import NavBar from '../../components/navBar/navBar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([null, null, null]);
  const [currentGroupStart, setCurrentGroupStart] = useState(0);

  useEffect(() => {
    let unsubscribe = () => {};

    const setupRealtimeListener = () => {
      if (!auth.user?.uid) {
        console.log("Dashboard: No hay usuario loggeado. Inicializando plantas a null.");
        setPlants([null, null, null]);
        return;
      }

      const userRef = doc(db, 'users', auth.user.uid);

      unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          let loadedPlants = Array.isArray(userData.plants) ? userData.plants : [];

          while (loadedPlants.length < 3) {
            loadedPlants.push(null);
          }

          setPlants(loadedPlants);
          console.log("Dashboard (onSnapshot): Plantas cargadas:", loadedPlants);

        } else {
          console.log("Dashboard (onSnapshot): Documento de usuario NO encontrado. Inicializando plantas a null.");
          setPlants([null, null, null]);
        }
      }, (error) => {
        console.error("Dashboard (onSnapshot): Error al escuchar datos del jardín en tiempo real:", error);
        setPlants([null, null, null]);
      });
    };

    setupRealtimeListener();

    return () => {
      console.log("Dashboard: Desuscribiendo del listener de Firestore.");
      unsubscribe();
    };
  }, [auth.user]);

  const handleSelectCentralPot = async (selectedIndex) => {
    if (selectedIndex === currentGroupStart + 1 || !plants[selectedIndex]) {
      return;
    }

    const updatedPlants = plants.map(p => p ? { ...p } : null);

    const plantToMoveToCenter = updatedPlants[selectedIndex];
    const plantCurrentlyInCenter = updatedPlants[currentGroupStart + 1];

    updatedPlants[currentGroupStart + 1] = { ...plantToMoveToCenter };
    updatedPlants[selectedIndex] = plantCurrentlyInCenter ? { ...plantCurrentlyInCenter } : null;

    setPlants(updatedPlants);

    const userRef = doc(db, 'users', auth.user.uid);
    await updateDoc(userRef, {
      centralPlantId: plantToMoveToCenter.id
    });
  };

  const visiblePlants = plants.slice(currentGroupStart, currentGroupStart + 3);

  return (
    <div className='dashboard'>
      <Background />
      <NavBar />

      <div className="carousel-controls">
        <button
          onClick={() => setCurrentGroupStart(prev => Math.max(prev - 3, 0))}
          disabled={currentGroupStart === 0}
        >
          ←
        </button>
        <button
          onClick={() => setCurrentGroupStart(prev => Math.min(prev + 3, plants.length - 3))}
          disabled={currentGroupStart + 3 >= plants.length}
        >
          →
        </button>
      </div>

      <div className="pots-container">
        {visiblePlants.map((plantData, index) => {
          const realIndex = currentGroupStart + index;
          let positionClass = ['pot-position-left', 'pot-position-center', 'pot-position-right'][index];

          return (
            <Pot
              key={`pot-${realIndex}-${plantData?.id || 'empty'}`}
              plantData={plantData ? { ...plantData } : null}
              isCentral={index === 1}
              potIndex={realIndex}
              onSelectCentralPot={handleSelectCentralPot}
              className={positionClass}
            />
          );
        })}
      </div>

      <div className="btn-container">
        <EcoButton />
        <ActivitiesBton />
      </div>
    </div>
  );
};

export default Dashboard;