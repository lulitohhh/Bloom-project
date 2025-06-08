
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
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([null, null, null]); 
  const [centralIndex, setCentralIndex] = useState(1); 

  useEffect(() => {
    let unsubscribe = () => {}; 

    const setupRealtimeListener = () => {
      if (!auth.user?.uid) {
        console.log("Dashboard: No hay usuario loggeado. Inicializando plantas a null.");
        setPlants([null, null, null]);
        setCentralIndex(1);
        return;
      }

      const userRef = doc(db, 'users', auth.user.uid);
      
      unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("Dashboard (onSnapshot): Documento de usuario encontrado. userData.plants:", userData.plants);
          
          let loadedPlants = Array.isArray(userData.plants) ? userData.plants : []; 
          
          while (loadedPlants.length < 3) {
            loadedPlants.push(null);
          }
          console.log("Dashboard (onSnapshot): Plantas cargadas y formateadas:", loadedPlants);
          setPlants(loadedPlants);

          let newCentralIndex = centralIndex; 
          if (!loadedPlants[newCentralIndex]) { 
            if (loadedPlants[0]) {
              newCentralIndex = 0;
            } else if (loadedPlants[1]) { 
              newCentralIndex = 1;
            } else if (loadedPlants[2]) {
              newCentralIndex = 2;
            } else { 
              newCentralIndex = 1;
            }
          }
          setCentralIndex(newCentralIndex);

        } else {
          console.log("Dashboard (onSnapshot): Documento de usuario NO encontrado. Inicializando plantas a null.");
          setPlants([null, null, null]);
          setCentralIndex(1); 
        }
      }, (error) => { 
        console.error("Dashboard (onSnapshot): Error al escuchar datos del jardín en tiempo real:", error);
        setPlants([null, null, null]);
        setCentralIndex(1); 
      });
    };

    setupRealtimeListener();

    return () => {
      console.log("Dashboard: Desuscribiendo del listener de Firestore.");
      unsubscribe();
    };

  }, [auth.user]); 

  const handleSelectCentralPot = (selectedIndex) => {
    if (selectedIndex === centralIndex || !plants[selectedIndex]) {
      return;
    }
    setCentralIndex(selectedIndex); 
  };


  return (
    <div className='dashboard'>
      <Background />
      <NavBar /> {/* La NavBar que ya contiene sus propios botones */}
      <div className="pots-container">
        {Array.isArray(plants) && plants.map((plantData, index) => (
          <Pot
            key={`pot-${index}`}
            plantData={plantData}
            isCentral={index === centralIndex}
            potIndex={index}
            onSelectCentralPot={handleSelectCentralPot}
          />
        ))}
      </div>
      <div className="btn-container">
        {/* Aquí van SOLO los botones que NO están en la NavBar */}
        <EcoButton />
        <ActivitiesBton />
      </div>
    </div>
  );
};

export default Dashboard;