import './QuizGame.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnswer, resetQuiz } from '../../redux/Activities/QuizGameSlice';
import cuestionarios from '../../data/Quizzes.json';
import Header from '../Header/Header';
import AnswerOption from '../AnswerOption/AnswerOption';
import NextButton from '../NextButton/NextButton';
import NavBar from '../navBar/navBar';

const QuizGame = ({ id, onSuccess }) => {
  const dispatch = useDispatch();
  const { selection, correct } = useSelector((state) => state.quiz);
  const question = cuestionarios.find((p) => p.id === id);

  useEffect(() => {
    dispatch(resetQuiz());
  }, [id, dispatch]);

  const handleResponse = (answer) => {
    dispatch(selectAnswer({ answer, correctAnswer: question.correctAnswer }));
  };

  if (!question) return <p>Pregunta no encontrada.</p>;

  return (
    <>
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
    </>
  );
};

export default QuizGame;
