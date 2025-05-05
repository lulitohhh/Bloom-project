import "./Coin.css"
import Coin from '../../assets/images/Coin.png'
//import { useSelector } from 'react-redux';

const CoinCounter = () => {
  //const coins = useSelector((state) => state.game.coins);

  return (
    <div className='Coin-Bar'>
      
      <img id="CoinIndicator" src={Coin} alt="" /> 
          <div className="coin-counter">
             
          </div>
      
      
    </div>
  );
};

export default CoinCounter;