
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
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [potPlantsData, setPotPlantsData] = useState([]);

  useEffect(() => {
    const loadPotPlants = async () => {
      if (!auth.user?.uid) return;

      const userRef = doc(db, 'users', auth.user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setPotPlantsData(userData.potPlants || []);
      }
    };

    loadPotPlants();
  }, [auth.user]);

  useEffect(() => {
    if (auth.user?.uid) {
      console.log("UID en Dashboard:", auth.user.uid);
    } else {
      console.error("Error: No hay UID. Redirigiendo a login...");
      // navigate('/login'); // Opcional: redirige si no hay UID
    }
  }, [auth.user]);

  return (
    <div className='dashboard'>
      <Background />
      <NavBar/>
      <div className="pots-container">
        {potPlantsData.map((plant, index) => (
          <Pot key={index} plantData={plant} />
        ))}
        <BigPot />
        {/* Si quieres más de 2 maceteros pequeños, puedes renderizar más componentes Pot */}
      </div>
      <div className="btn-container">
        <EcoButton/>
        <ActivitiesBton/>
      </div>
    </div>
  );
};

export default Dashboard;