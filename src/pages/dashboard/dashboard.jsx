
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
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setPotPlantsData(userData.potPlants || []);
        } else {
          console.log("No se encontró el documento del usuario al cargar las plantas de los maceteros pequeños.");
          setPotPlantsData([]);
        }
      } catch (error) {
        console.error("Error al cargar las plantas de los maceteros pequeños:", error);
        setPotPlantsData([]);
      }
    };
    loadPotPlants();
  }, [auth.user]);

  return (
    <div className='dashboard'>
      <Background />
      <NavBar/>
      <div className="pots-container">
        {[
          <Pot key={0} index={0} plantData={potPlantsData[0]} />,
          <BigPot key="big-pot" />,
          <Pot key={1} index={1} plantData={potPlantsData[1]} />,
        ]}
      </div>
      <div className="btn-container">
        <EcoButton/>
        <ActivitiesBton/>
      </div>
    </div>
  );
};

export default Dashboard;