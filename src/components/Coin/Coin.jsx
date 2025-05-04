import "./Coin.css"
import Coin from '../../assets/images/Coin.png'


const CoinCounter = () => {
  return (
    <div className='Coin-Bar'>
      
      <img id="CoinIndicator" src={Coin} alt="" />
      
    </div>
  );
};

export default CoinCounter;