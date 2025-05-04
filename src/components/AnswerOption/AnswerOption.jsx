import './AnswerOption.css';

const colors = ['green', 'red', 'yellow', 'blue'];

const AnswerOption = ({ text, index, selection, correct, onSelect, wasRespondedCorrectly, size = "default"}) => {
  const isSelected = selection === text;
  const isCorrect = text === correct;

  const baseClass = `answer ${colors[index]}`;  // Clase base que nunca debe cambiar
  const sizeClass = size === "small" ? "answer-small" : "";  // Clase de tamaño, puede ser pequeña o no

  const stateClass = isSelected
    ? isCorrect
      ? "correcta" // Se aplica cuando la respuesta es correcta
      : "incorrecta" // Se aplica cuando la respuesta es incorrecta
    : "";

  // Unimos todas las clases necesarias, manteniendo las de base y tamaño
  const classes = [baseClass, sizeClass, stateClass].filter(Boolean).join(' ');
  return (
    <button 
      className={classes} 
      onClick={onSelect} 
      disabled={wasRespondedCorrectly} // solo se bloquea si ya acertaste
    >
      {text}
    </button>
  );
};
export default AnswerOption;
