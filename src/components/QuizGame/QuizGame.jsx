
import './QuizGame.css';
import { useState } from 'react';
import cuestionarios from '../../data/cuestionarios.json';
import Header from '../Header/Header';
import OpcionRespuesta from '../AnswerOption/AnswerOption';
import BotonSiguiente from '../NextButton/NextButton';

const Pregunta = ({ id, onSuccess }) => {
  const pregunta = cuestionarios.find((p) => p.id === id);
  const [seleccion, setSeleccion] = useState(null);
  const [correcta, setCorrecta] = useState(false);

  if (!pregunta) return <p>Pregunta no encontrada.</p>;

  const manejarRespuesta = (respuesta) => {
    if (correcta) return;

    setSeleccion(respuesta);
    const esCorrecta = respuesta === pregunta.correctAnswer;
    setCorrecta(esCorrecta);
  };

  return (
    <section className="pregunta-container">
      <section className="pregunta-box">
        <Header tipo={pregunta.type} titulo={pregunta.title} />
        <section className="pregunta-opciones">
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
        </section>
        <BotonSiguiente onClick={onSuccess} disabled={!correcta} />
      </section>
    </section>
  );
};

export default Pregunta;

