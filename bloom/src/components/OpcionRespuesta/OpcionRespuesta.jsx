import './OpcionRespuesta.css';

const colores = ['verde', 'rojo', 'amarillo', 'azul'];

const OpcionRespuesta = ({ texto, index, seleccion, correcta, onSelect }) => {
  const esSeleccionada = seleccion === texto;
  const esCorrecta = texto === correcta;

  const clases = esSeleccionada
    ? esCorrecta
      ? 'respuesta correcta'
      : 'respuesta incorrecta'
    : `respuesta ${colores[index]}`;

  return (
    <button className={clases} onClick={onSelect} disabled={!!seleccion}>
      {texto}
    </button>
  );
};

export default OpcionRespuesta;
