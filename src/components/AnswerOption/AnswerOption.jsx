import './AnswerOption.css';

const colors = ['green', 'red', 'yellow', 'blue'];

const AnswerOption = ({ text, index, selection, correct, onSelect, wasRespondedCorrectly }) => {
  const isSelected = selection === text;
  const isCorrect = text === correct;

  const clases = isSelected
    ? isCorrect
      ? 'respuesta correcta'
      : 'respuesta incorrecta'
    : `respuesta ${colors[index]}`;

  return (
    <button 
      className={clases} 
      onClick={onSelect} 
      disabled={wasRespondedCorrectly} // solo se bloquea si ya acertaste
    >
      {text}
    </button>
  );
};
export default AnswerOption;
