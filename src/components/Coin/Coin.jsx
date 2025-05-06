import "./Coin.css";
import Coin from '../../assets/images/Coin.png';
import { useSelector } from 'react-redux';

const CoinCounter = () => {
  const coins = useSelector((state) => state.coins.coins); // Asegúrate que "coin" es el nombre del slice en tu store

  return (
    <div className='Coin-Bar'>
      <img id="CoinIndicator" src={Coin} alt="Coin" />
      <div className="coin-counter">
        {coins} 
      </div>
    </div>
  );
};

export default CoinCounter;