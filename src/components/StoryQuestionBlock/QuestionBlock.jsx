// src/components/StoryQuestionBlock/QuestionBlock.jsx
import { useState, useEffect } from 'react';
import AnswerOption from '../AnswerOption/AnswerOption';
import './QuestionBlock.css';

function QuestionBlock({ question, onAnswer, questionIndex }) {
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    setSelection(null); // Reset selection on question change
  }, [questionIndex]); // Reset on page change

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === question.correctAnswer;
    setSelection(selectedOption);
    onAnswer(isCorrect, questionIndex); // Pass question index to track answers
  };

  const options =
    question.type === 'true-false'
      ? ['True', 'False']
      : question.options;

  return (
    <div className="question-block">
      <p className="question-text">{question.text}</p>
      <div className="question-buttons-container">
        {options.map((option, index) => (
          <AnswerOption
            key={option}
            text={option}
            index={index}
            selection={selection}
            correct={question.correctAnswer}
            onSelect={() => handleAnswer(option)}
            wasRespondedCorrectly={selection !== null}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionBlock;
