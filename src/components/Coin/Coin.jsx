import "./Coin.css";
import Coin from '../../assets/images/Coin.png';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { loadCoinsFromFirestore } from "../../redux/coinSlice";


const CoinCounter = () => {
  const coins = useSelector((state) => state.coins.coins); 
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user?.uid) {
      dispatch(loadCoinsFromFirestore(auth.user.uid)); // Recarga al montar
    }
  }, [auth.user?.uid]);

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