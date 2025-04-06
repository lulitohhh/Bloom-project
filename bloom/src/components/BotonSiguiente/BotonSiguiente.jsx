import './BotonSiguiente.css';

const BotonSiguiente = ({ onClick }) => (
  <button className="boton-siguiente" onClick={onClick}>
    Next Question
  </button>
);

export default BotonSiguiente;
