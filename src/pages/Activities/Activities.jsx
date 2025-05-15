import { useState, useEffect } from 'react';
import './Activities.css';
import bgImage from '../../assets/images/fondo.png';
import QuizGame from '../../components/QuizGame/QuizGame';
import AssociationGame from '../../components/AssociationGame/AssociationGame';
import StoryGame from '../../components/StoryGame/StoryGame';
import SessionSummary from '../../components/SessionSummary/SessionSummary';
import { useSelector } from 'react-redux';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const Activities = () => {
  const [paso, setPaso] = useState(0);
  const [actividades, setActividades] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user?.uid) {
      console.log("Login exitoso. UID:", auth.user.uid);
    }
  }, [auth.user]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        // Obtener quizzes y associations desde Firestore
        const quizSnap = await getDocs(collection(db, 'quizzes'));
        const associationSnap = await getDocs(collection(db, 'association'));

        // Mapear documentos a objetos con id y tipo
        const quizzes = quizSnap.docs.map(doc => ({ type: 'quiz', id: doc.id }));
        const associations = associationSnap.docs.map(doc => ({ type: 'association', id: doc.id }));

        // Mezclar y seleccionar actividades (como antes)
        const allActivities = [...quizzes, ...associations];
        const mezcladas = [...allActivities].sort(() => Math.random() - 0.5);
        const cantidad = Math.floor(Math.random() * 2) + 4;
        const seleccionadas = mezcladas.slice(0, cantidad);

        // Agregar historia sin id porque StoryGame la obtiene internamente desde Firestore
        const finalList = [...seleccionadas, { type: 'story' }];

        localStorage.setItem('actividad-lista', JSON.stringify(finalList));
        setActividades(finalList);
      } catch (error) {
        console.error('Error cargando actividades:', error);
      }
    }

    fetchActivities();
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
        ? <SessionSummary />
        : actividades[paso] && renderActividad(actividades[paso])
      }
      <img src={bgImage} alt="Lower-decoration" className="background-bottom" />
    </div>
  );
};

export default Activities;