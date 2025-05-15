import "./Coin.css";

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { loadCoinsFromFirestore } from "../../redux/coinSlice";

import Coin from '../../assets/images/Coin.webp';


const CoinCounter = () => {
  const dispatch = useDispatch()
  const coins = useSelector((state) => state.coins.coins); 
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user?.uid) {
      dispatch(loadCoinsFromFirestore(auth.user.uid)); 
    }
  }, [dispatch, auth.user?.uid]);

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