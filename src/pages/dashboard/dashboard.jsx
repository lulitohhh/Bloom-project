// src/pages/Actividades.jsx
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

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

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
        <Pot />
        <BigPot /> 
        <Pot />
      </div>
      <div className="btn-container">
        <EcoButton/>
        <ActivitiesBton/>
      </div>
    </div>
  );
};

export default Dashboard;