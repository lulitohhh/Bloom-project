// src/pages/Actividades.jsx
import { useState } from 'react';
import './Actividades.css';
import bgImage from '../assets/images/fondo.png';
import Pregunta from '../components/Pregunta/Pregunta';
import Asociacion from '../components/Asociacion/Asociacion';

const Actividades = () => {
  const [paso, setPaso] = useState(0);

  const avanzarPaso = () => setPaso((prev) => prev + 1);

  return (
    <div>
      {paso === 0 && <Pregunta id={1} onSuccess={avanzarPaso} />}
      {paso === 1 && <Pregunta id={2} onSuccess={avanzarPaso} />}
      {paso === 2 && <Asociacion id={1} onSuccess={avanzarPaso} />}
      {paso === 3 && <Asociacion id={2} onSuccess={avanzarPaso} />}


      <img src={bgImage} alt="Decoración inferior" className="fondo-inferior" />
    </div>
  );
};

export default Actividades;
