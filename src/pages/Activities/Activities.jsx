import { useState } from 'react';
import './Activities.css';
import bgImage from '../assets/images/fondo.png';
import QuizGame from '../../components/QuizGame/QuizGame';
import AssociationGame from '../../components/AssociationGame/AssociationGame';
import HistoryGame from '../../components/HistoryGame/HistoryGame';

const Activities = () => {
  const [paso, setPaso] = useState(0);

  const avanzarPaso = () => setPaso((prev) => prev + 1);

  return (
    <div>
      {paso === 0 && <QuizGame id={1} onSuccess={avanzarPaso} />}
      {paso === 1 && <QuizGame id={2} onSuccess={avanzarPaso} />}
      {paso === 2 && <AssociationGame id={1} onSuccess={avanzarPaso} />}
      {paso === 3 && <AssociationGame id={2} onSuccess={avanzarPaso} />}
      {paso === 4 && <HistoryGame onFinish={avanzarPaso} />} 

      <img src={bgImage} alt="Decoración inferior" className="fondo-inferior" />
    </div>
  );
};

export default Activities;
