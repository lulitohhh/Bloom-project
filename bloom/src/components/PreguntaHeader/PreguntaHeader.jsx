import './PreguntaHeader.css';

const PreguntaHeader = ({ texto }) => (
  <>
  <section className="subtitulo-container">

    <p className="pregunta-subtitulo">Think and answer!</p>
    
  </section>

    <h2 className="pregunta-titulo">{texto}</h2>
  </>
);

export default PreguntaHeader;
