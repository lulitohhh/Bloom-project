import './BotonSiguiente.css';

const BotonSiguiente = ({ onClick, disabled }) => {
  return (
    <button 
      className="boton-siguiente" 
      onClick={onClick} 
      disabled={disabled}
    >
      Next Question
    </button>
  );
};

export default BotonSiguiente;