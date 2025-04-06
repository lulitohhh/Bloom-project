// src/pages/Actividades.jsx
import { useState } from 'react';
import Pregunta from '../components/Pregunta/Pregunta';

const Actividades = () => {
  const [paso, setPaso] = useState(0);

  const avanzarPaso = () => setPaso((prev) => prev + 1);

  return (
    <div>
      {paso === 0 && <Pregunta id={1} onSuccess={avanzarPaso} />}
      {paso === 1 && <Pregunta id={2} onSuccess={avanzarPaso} />}
      {/* Luego podrás colocar aquí los demás componentes */}
    </div>
  );
};

export default Actividades;
