import './PreguntaHeader.css';

const PreguntaHeader = ({ texto }) => (
  <>
    <p className="pregunta-subtitulo">Think and answer!</p>
    <h2 className="pregunta-titulo">{texto}</h2>
  </>
);

export default PreguntaHeader;
