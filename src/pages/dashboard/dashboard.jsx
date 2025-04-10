// src/pages/Actividades.jsx
import React from 'react';

import "./dashboard.css"
import Background from '../../components/background/background';
import BigPot from '../../components/BigPot/BigPot';
import Pot from '../../components/pot/pot';
import EcoButton from '../../components/ecoButton/ecoButton';
import ActivitiesBton from '../../components/activitiesBton/activitiesBton';


const Dashboard = () => {


  return (
    <div className='dashboard'>
      <Background />
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