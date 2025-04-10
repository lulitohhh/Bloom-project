// src/pages/Actividades.jsx
import React from 'react';

import "./dashboard.css"
import Background from '../../components/background/background';
import BigPot from '../../components/BigPot/BigPot';
import Pot from '../../components/pot/pot';
import EcoButton from '../../components/ecoButton/ecoButton';

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
      </div>
    </div>
  );
};

export default Dashboard;