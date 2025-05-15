import './QuizGame.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnswer, resetQuiz } from '../../redux/Activities/QuizGameSlice';

import Header from '../Header/Header';
import AnswerOption from '../AnswerOption/AnswerOption';
import NextButton from '../NextButton/NextButton';
import NavBar from '../navBar/navBar';
import { addSessionCoins } from '../../redux/sessionCoinsSlice';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const QuizGame = ({ id, onSuccess }) => {
  const dispatch = useDispatch();
  const { selection, correct } = useSelector((state) => state.quiz);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const coinsGiven = useRef(false);


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const docRef = doc(db, 'quizzes', id.toString()); 
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setQuestion({
            id: docSnap.id,
            ...docSnap.data()
          });
        } else {
          setError('Pregunta no encontrada');
        }
      } catch (err) {
        setError('Error al cargar la pregunta');
        console.error("Error fetching question:", err);
      } finally {
        setLoading(false);
      }
    };

    dispatch(resetQuiz());
    coinsGiven.current = false;
    fetchQuestion();
  }, [id, dispatch]);

  useEffect(() => {
    if (selection && correct && !coinsGiven.current) {
      console.log('Monedas otorgadas ID:', id);
      dispatch(addSessionCoins(3));
      coinsGiven.current = true;
    }
  }, [selection, correct, dispatch, id]);

  const handleResponse = (answer) => {
    if (question) {
      dispatch(selectAnswer({ answer, correctAnswer: question.correctAnswer }));
    }
  };

  if (loading) return <p>Cargando pregunta...</p>;
  if (error) return <p>{error}</p>;
  if (!question) return <p>Pregunta no encontrada.</p>;

  return (
   <section className='quiz-container'>
      <NavBar />
      <section className="question-container">
        <Header type={question.type} title={question.title} />
        <section className="question-box">
          <section className="question-option">
            {question.options.map((option, index) => (
              <AnswerOption
                key={index}
                text={option}
                index={index}
                selection={selection}
                correct={question.correctAnswer}
                onSelect={() => handleResponse(option)}
              />
            ))}
          </section>
          <NextButton onClick={onSuccess} disabled={!correct} />
        </section>
      </section>
    </section>
  );
};

export default QuizGame;