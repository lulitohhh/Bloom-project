import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import GardenAlbum from './pages/GardenAlbum/GardenAlbum';
import Activities from './pages/Activities/Activities';
import ShopScreen from './pages/shop/shopScreen';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} /> {/* ✅ nombre correcto */}
          <Route path="/garden" element={<GardenAlbum />} />
          <Route path="/shop" element={<ShopScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
