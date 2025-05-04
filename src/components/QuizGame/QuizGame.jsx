
import './QuizGame.css';
import { useState } from 'react';
import cuestionarios from '../../data/Quizzes.json';
import Header from '../Header/Header';
import AnswerOption from '../AnswerOption/AnswerOption';
import NextButton from '../NextButton/NextButton';

const QuizGame = ({ id, onSuccess }) => {
  const question = cuestionarios.find((p) => p.id === id);
  const [selection, setSelection] = useState(null);
  const [correct, setCorrect] = useState(false);

  if (!question) return <p>Pregunta no encontrada.</p>;

  const handleResponse = (answer) => {
    if (correct) return;

    setSelection(answer);
    const isCorrect = answer === question.correctAnswer;
    setCorrect(isCorrect);
  };

  return (
    <section className="question-container">
      <section className="question-box">
        <Header tipo={question.type} titulo={question.title} />
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
  );
};

export default QuizGame;

