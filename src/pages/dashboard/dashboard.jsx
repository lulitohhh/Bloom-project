
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
  const [centralPlantId, setCentralPlantId] = useState(null);
  const [currentGroupStart, setCurrentGroupStart] = useState(0);

  useEffect(() => {
    if (!auth.user?.uid) return;

    const userRef = doc(db, 'users', auth.user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          let loadedPlants = Array.isArray(userData.plants) ? [...userData.plants] : [];
          const totalPots = Math.min(userData.pots || 3, 9);

          while (loadedPlants.length < totalPots) {
            loadedPlants.push(null);
          }

          setPlants(loadedPlants);
          setCentralPlantId(userData.centralPlantId || null);
        } else {
          setPlants([null, null, null]);
          setCentralPlantId(null);
        }
      },
      (error) => {
        console.error("Error al escuchar datos en tiempo real:", error);
        setPlants([null, null, null]);
        setCentralPlantId(null);
      }
    );

    return () => unsubscribe();
  }, [auth.user]);

  const handleSelectCentralPot = async (selectedIndex) => {
    const selectedPlant = plants[selectedIndex];
    if (!selectedPlant || selectedPlant.id === centralPlantId) return;

    const userRef = doc(db, 'users', auth.user.uid);
    await updateDoc(userRef, {
      centralPlantId: selectedPlant.id
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
          onClick={() =>
            setCurrentGroupStart(prev =>
              Math.min(prev + 3, Math.max(plants.length - 3, 0))
            )
          }
          disabled={currentGroupStart + 3 >= plants.length}
        >
          →
        </button>
      </div>

      <div className="pots-container">
        {visiblePlants.map((plantData, index) => {
          const realIndex = currentGroupStart + index;
          const positionClass = ['pot-position-left', 'pot-position-center', 'pot-position-right'][index] || '';
          const isCentral = plantData?.id === centralPlantId;

          return (
            <Pot
              key={`pot-${realIndex}-${plantData?.id || 'empty'}`}
              plantData={plantData ? { ...plantData } : null}
              potIndex={realIndex}
              onSelectCentralPot={handleSelectCentralPot}
              className={positionClass}
              isCentral={isCentral}
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