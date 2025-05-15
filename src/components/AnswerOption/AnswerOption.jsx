import './AnswerOption.css';

const colors = ['green', 'red', 'yellow', 'blue'];

const AnswerOption = ({ text, index, selection, correct, onSelect, wasRespondedCorrectly, size = "default"}) => {
  const isSelected = selection === text;
  const normalize = (val) => {
    if (typeof val === 'string') {
      if (val.toLowerCase() === 'true') return true;
      if (val.toLowerCase() === 'false') return false;
    }
    return val;
  };
  
  const isCorrect = normalize(text) === normalize(correct);
  
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
      disabled={wasRespondedCorrectly} 
    >
      {text}
    </button>
  );
};
export default AnswerOption;
