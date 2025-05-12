import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import GardenAlbum from './pages/GardenAlbum/GardenAlbum';
import Actividades from './pages/Activities/Activities'
import ShopScreen from './pages/shop/shopScreen'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Actividades />} />
        <Route path="/garden" element={<GardenAlbum />} />
        <Route path="/shop" element={<ShopScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
