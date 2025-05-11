import { useDispatch, useSelector } from 'react-redux';
import { addCoins } from '../../redux/coinSlice';
import { resetSessionCoins } from '../../redux/sessionCoinsSlice';
import './SessionSummary.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/navBar';

const SessionSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionTotal = useSelector((state) => state.sessionCoins.sessionTotal);

  const handleFinish = () => {
    dispatch(addCoins(sessionTotal));
    dispatch(resetSessionCoins());
    navigate('/'); 
  };

  return (
    <>
    <NavBar></NavBar>
    <div className="session-summary">
     <img src="/assets/images/celebration.webp" alt="Coin" className="coin-icon" />
      <h2>¡Has ganado {sessionTotal} monedas en esta sesión!</h2>
      <button className="continue-button" onClick={handleFinish}>
        Continuar
      </button>
    </div>
    </>
  );
};

export default SessionSummary;
