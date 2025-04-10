import './BotonSiguiente.css';

const BotonSiguiente = ({ onClick, disabled, label = "Next" }) => { // Valor predeterminado aquí
  return (
    <button 
      className="boton-siguiente" 
      onClick={onClick} 
      disabled={disabled}
    >
      {label} {/* Mostrará "Next" si label no está definido */}
    </button>
  );
};

export default BotonSiguiente;  