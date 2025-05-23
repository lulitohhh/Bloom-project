import { useDispatch, useSelector } from 'react-redux';
import { addCoins } from '../../redux/coinSlice';
import { resetSessionCoins } from '../../redux/sessionCoinsSlice';
import './SessionSummary.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/navBar';
import celebrationImage from '../../assets/images/Celebration.webp';
import NextButton from '../../components/NextButton/NextButton' ;



const SessionSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionTotal = useSelector((state) => state.sessionCoins.sessionTotal);

  

  const handleFinish = () => {
    dispatch(addCoins(sessionTotal));
    dispatch(resetSessionCoins());
    navigate('/dashboard'); 
  };

  return (
    <section className='page-container'>
    <NavBar></NavBar>
    <section className="session-summary"> 
       <img src={celebrationImage} alt="CelebrationImage" className="HappyCoin-icon" />
       <section className='Text-summary'>
            <h1>¡Lo lograste!</h1>
            <p>Has aprendido sobre el medio ambiente y has ganado</p>
            <h2> {sessionTotal} monedas.</h2>
        </section>
        <NextButton 
        text="Continuar"
        onClick={handleFinish}
        className="continue-button"
      />
    </section>
    </section>
  );
};

export default SessionSummary;
