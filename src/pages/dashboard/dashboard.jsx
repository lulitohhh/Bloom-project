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


const Dashboard = () => {


  return (
    <div className='dashboard'>
      <Background />
      <div className="up-container">
        <div className="leftup">
          <BackButton/>
          <ShopBton/>
        </div>
        <div className="rightup">
          
        </div>
      </div>
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