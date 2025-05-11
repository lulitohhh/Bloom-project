// src/components/CompletionScreen/CompletionScreen.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoins } from '../../redux/coinSlice';  // Para agregar las monedas al contador
import './CompletionScreen.css';

function CompletionScreen({ totalCoins, onFinish }) {
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);

  // Lógica para pasar las monedas al componente Coin
  useEffect(() => {
    if (totalCoins > 0 && !isFinished) {
      dispatch(addCoins(totalCoins));
      setIsFinished(true); // Evitar que las monedas se sumen más de una vez
    }
  }, [totalCoins, dispatch, isFinished]);

  return (
    <div className="completion-screen">
      <h1>¡Lo lograste!</h1>
      <p>Has aprendido sobre el medio ambiente y has ganado {totalCoins} monedas.</p>
      <button onClick={onFinish}>Volver al inicio</button>
    </div>
  );
}

export default CompletionScreen;
