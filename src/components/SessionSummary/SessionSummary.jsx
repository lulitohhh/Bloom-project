import { useDispatch, useSelector } from 'react-redux';
import { addCoins } from '../../redux/coinSlice';
import { resetSessionCoins } from '../../redux/sessionCoinsSlice';
import './SessionSummary.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/navBar';
import celebrationImage from '../../assets/images/celebration.webp';



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
       <img src={celebrationImage} alt="CelebrationImage" className="coin-icon" />
        <h1>¡Lo lograste!</h1>
        <p>Has aprendido sobre el medio ambiente y has ganado {sessionTotal} monedas.</p>
       <button className="continue-button" onClick={handleFinish}> Continuar </button>
    </div>
    </>
  );
};

export default SessionSummary;
