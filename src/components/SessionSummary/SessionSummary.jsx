import { useDispatch, useSelector } from 'react-redux';
import { addCoins } from '../../redux/coinSlice';
import { resetSessionCoins } from '../../redux/sessionCoinsSlice';
import './SessionSummary.css';

const SessionSummary = ({ onContinue }) => {
  const dispatch = useDispatch();
  const sessionTotal = useSelector((state) => state.sessionCoins.sessionTotal);

  const handleContinue = () => {
    dispatch(addCoins(sessionTotal));
    dispatch(resetSessionCoins());
    onContinue(); // Ej: navegar al home o tienda
  };

  return (
    <div className="session-summary">
      <h2>¡Has ganado {sessionTotal} monedas en esta sesión!</h2>
      <img src="/assets/images/Coin.png" alt="Coin" className="coin-icon" />
      <button className="continue-button" onClick={handleContinue}>
        Continuar
      </button>
    </div>
  );
};

export default SessionSummary;
