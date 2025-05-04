import './AnswerOption.css';

const colores = ['verde', 'rojo', 'amarillo', 'azul'];

const AnswerOption = ({ texto, index, seleccion, correct, onSelect, fueRespondidaCorrectamente }) => {
  const esSeleccionada = seleccion === texto;
  const isCorrect = texto === correct;

  const clases = esSeleccionada
    ? isCorrect
      ? 'respuesta correcta'
      : 'respuesta incorrecta'
    : `respuesta ${colores[index]}`;

  return (
    <button 
      className={clases} 
      onClick={onSelect} 
      disabled={fueRespondidaCorrectamente} // solo se bloquea si ya acertaste
    >
      {texto}
    </button>
  );
};
export default AnswerOption;
