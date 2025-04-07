// src/components/PreguntaHeader/PreguntaHeader.jsx
import './PreguntaHeader.css';

const PreguntaHeader = ({ tipo, titulo }) => (
  <section className="pregunta-header">
    <section className="subtitulo-container">
      <p className="pregunta-subtitulo">{tipo}</p>
    </section>
    <h2 className="pregunta-titulo">{titulo}</h2>
  </section>
);

export default PreguntaHeader;
