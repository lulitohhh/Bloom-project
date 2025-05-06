import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import React from 'react';
import GardenAlbum from './pages/GardenAlbum'
import Activities from './pages/Activities/Activities';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/garden" element={<GardenAlbum />} />
          {/* Puedes agregar más rutas aquí si luego tienes más páginas */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
