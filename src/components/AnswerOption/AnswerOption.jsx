import './AnswerOption.css';

const colors = ['green', 'red', 'yellow', 'blue'];

const AnswerOption = ({ text, index, selection, correct, onSelect, wasRespondedCorrectly, size = "default"}) => {
  const isSelected = selection === text;
  const isCorrect = text === correct;



  const stateClass = isSelected
    ? isCorrect
      ? "correcta"
      : "incorrecta"
    : "";
    
    const classes = [
      'answer',
      colors[index],
      size === 'small' ? 'answer-small' : '',
      stateClass
    ].filter(Boolean).join(' ');


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
