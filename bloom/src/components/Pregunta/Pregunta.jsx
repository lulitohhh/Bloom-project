// src/components/Pregunta/Pregunta.jsx
import './Pregunta.css';
import { useState } from 'react';
import cuestionarios from '../../data/cuestionarios.json';
import PreguntaHeader from '../PreguntaHeader/PreguntaHeader';
import OpcionRespuesta from '../OpcionRespuesta/OpcionRespuesta';
import BotonSiguiente from '../BotonSiguiente/BotonSiguiente';


const Pregunta = ({ id, onSuccess }) => {
  const pregunta = cuestionarios.find((p) => p.id === id);
  const [seleccion, setSeleccion] = useState(null);
  const [correcta, setCorrecta] = useState(false);

  if (!pregunta) return <p>Pregunta no encontrada.</p>;

  const manejarRespuesta = (opcion) => {
    setSeleccion(opcion);
    const esCorrecta = opcion === pregunta.correctAnswer;
    setCorrecta(esCorrecta);
  };

  return (
    <div className="pregunta-container">
      <div className="pregunta-box">
        <PreguntaHeader texto={pregunta.question} />
        <div className="pregunta-opciones">
          {pregunta.options.map((opcion, index) => (
            <OpcionRespuesta
              key={index}
              texto={opcion}
              index={index}
              seleccion={seleccion}
              correcta={pregunta.correctAnswer}
              onSelect={() => manejarRespuesta(opcion)}
            />
          ))}
        </div>
        {seleccion && correcta && <BotonSiguiente onClick={onSuccess} />}
      </div>
      
    </div>
  );
};

export default Pregunta;
