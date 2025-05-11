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
    <section className="session-summary"> 
       <img src={celebrationImage} alt="CelebrationImage" className="coin-icon" />
       <section className='Text-summary'>
            <h1>¡Lo lograste!</h1>
            <p>Has aprendido sobre el medio ambiente y has ganado</p>
            <h2> {sessionTotal} monedas.</h2>
        </section>
       <button className="continue-button" onClick={handleFinish}> Continuar </button>
    </section>
    </>
  );
};

export default SessionSummary;
