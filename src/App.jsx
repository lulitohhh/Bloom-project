import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Actividades from './pages/Actividades';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Actividades />} />
        {/* Puedes agregar más rutas aquí si luego tienes más páginas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

