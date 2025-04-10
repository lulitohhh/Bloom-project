import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import React from 'react';

import Actividades from './pages/Actividades';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Actividades />} />
        {/* Puedes agregar más rutas aquí si luego tienes más páginas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
