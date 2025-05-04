import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import GardenAlbum from './pages/GardenAlbum/GardenAlbum';
import Actividades from './pages/Actividades';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Actividades />} />
        <Route path="/garden" element={<GardenAlbum />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
