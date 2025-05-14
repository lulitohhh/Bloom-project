import { useState, useEffect } from 'react';
import './Activities.css';
import bgImage from '../../assets/images/fondo.png';
import QuizGame from '../../components/QuizGame/QuizGame';
import AssociationGame from '../../components/AssociationGame/AssociationGame';
import StoryGame from '../../components/StoryGame/StoryGame';
import SessionSummary from '../../components/SessionSummary/SessionSummary';
import { useSelector } from 'react-redux';

const allActivities = [
  { type: 'quiz', id: 1 },
  { type: 'quiz', id: 2 },
  { type: 'quiz', id: 3 },
  { type: 'quiz', id: 4 },
  { type: 'quiz', id: 5 },
  { type: 'association', id: 1 },
  { type: 'association', id: 2 }
];

const Activities = () => {
  const [paso, setPaso] = useState(0);
  const [actividades, setActividades] = useState([]);
  const auth = useSelector((state) => state.auth); // Añade esto

  useEffect(() => {
    if (auth.user?.uid) {
      console.log("Login exitoso. UID:", auth.user.uid);
    }
  }, [auth.user]);




    useEffect(() => {
      localStorage.removeItem('actividad-lista'); 
      const mezcladas = [...allActivities].sort(() => Math.random() - 0.5);
      const cantidad = Math.floor(Math.random() * 2) + 4;
      const seleccionadas = mezcladas.slice(0, cantidad);
      const finalList = [...seleccionadas, { type: 'story' }];
      localStorage.setItem('actividad-lista', JSON.stringify(finalList));
      setActividades(finalList);
    }, []);

  const avanzarPaso = () => setPaso((prev) => prev + 1);

  const renderActividad = (actividad) => {
    if (actividad.type === 'quiz') {
      return <QuizGame id={actividad.id} onSuccess={avanzarPaso} />;
    }
    if (actividad.type === 'association') {
      return <AssociationGame id={actividad.id} onSuccess={avanzarPaso} />;
    }
    if (actividad.type === 'story') {
      return <StoryGame onFinish={avanzarPaso} />;
    }
    return null;
  };
  const isFinished = paso >= actividades.length;

  return (
     <div>
    {isFinished 
      ? <SessionSummary />  // ← aquí va tu componente de resumen
      : actividades[paso] && renderActividad(actividades[paso])
    }
    <img src={bgImage} alt="Lower-decoration" className="background-bottom" />
  </div>
  );
};

export default Activities;
