import { useState } from 'react';
import './QuestionBlock.css';

function QuestionBlock({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  function handleAnswer(answer) {
    const correct = answer === question.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    onAnswer(correct);
  }

  return (
    <div className="question-block">
      <p className="question-text">{question.text}</p>

      <div className="question-buttons-container">
        {question.type === 'true-false' ? (
          ['True', 'False'].map((text, index) => {
            const value = index === 0;
            const isSelected = selectedAnswer === value;
            return (
              <button
                key={text}
                className={`question-buttons ${
                  isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''
                }`}
                onClick={() => handleAnswer(value)}
                disabled={selectedAnswer !== null}
              >
                {text}
              </button>
            );
          })
        ) : (
          question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            return (
              <button
                key={option}
                className={`question-buttons ${
                  isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''
                }`}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default QuestionBlock;
