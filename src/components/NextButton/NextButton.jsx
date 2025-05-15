import './NextButton.css';

const BotonSiguiente = ({ onClick, disabled, label = "Next" }) => {
  return (
    <button 
      className="Next-button" 
      onClick={onClick} 
      disabled={disabled}
    >
      {label} 
    </button>
  );
};

export default BotonSiguiente;  