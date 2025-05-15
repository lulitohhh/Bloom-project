import './NextButton.css';

const BotonSiguiente = ({ onClick, disabled, label = "Next" }) => {
  return (
    <button 
      className="Next-button" 
      onClick={onClick} 
      disabled={disabled}
    >
      {label} {/* Mostrará "Next" si label no está definido */}
    </button>
  );
};

export default BotonSiguiente;  