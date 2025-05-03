import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import React from 'react';
import GardenAlbum from './pages/GardenAlbum'
import Activities from './pages/Actividades';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/garden" element={<GardenAlbum />} />
        {/* Puedes agregar más rutas aquí si luego tienes más páginas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
