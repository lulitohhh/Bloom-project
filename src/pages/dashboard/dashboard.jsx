// src/pages/Actividades.jsx
import React from 'react';


import Background from '../../components/background/background';
import BigPot from '../../components/BigPot/BigPot';
import Pot from '../../components/pot/pot';

const Dashboard = () => {


  return (
    <div className='dashboard'>
      <Background />
      <div className="pots">
        <BigPot /> <Pot /><Pot />
        
        
      </div>
    </div>
  );
};

export default Dashboard;