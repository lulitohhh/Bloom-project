import './QuestionBlock.css'; 

function QuestionBlock({ question, onAnswer }) {
  function handleTrueFalse(answer) {
    const isCorrect = answer === question.correctAnswer;
    onAnswer(isCorrect);
  }

  function handleMultipleChoice(option) {
    const isCorrect = option === question.correctAnswer;
    onAnswer(isCorrect);
  }

  return (
    <div className="question-block">
      <p className="question-text">{question.text}</p>

      {question.type === 'true-false' ? (
        <div className="question-buttons">
          <button onClick={() => handleTrueFalse(true)}>True</button>
          <button onClick={() => handleTrueFalse(false)}>False</button>
        </div>
      ) : (
        <div className="question-buttons">
          {question.options.map((option) => (
            <button key={option} onClick={() => handleMultipleChoice(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionBlock;
