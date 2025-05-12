import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard'
import GardenAlbum from './pages/GardenAlbum'
import Activities from './pages/Activities/Activities';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

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
