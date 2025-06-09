import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import GardenAlbum from './pages/GardenAlbum/GardenAlbum';
import Activities from './pages/Activities/Activities';
import ShopScreen from './pages/shop/shopScreen';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProfileScreen from './pages/Profile/ProfileScreen';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/activities" element={<Activities />} /> 
          <Route path="/garden" element={<GardenAlbum />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/perfil" element={<ProfileScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
