// src/components/StoryGame/StoryGame.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startStory,
  nextPage,
  registerCorrect,
} from '../../redux/Activities/storySlice';
import { addCoins } from '../../redux/coinSlice';
import { useNavigate } from 'react-router-dom';
import Stories from '../../data/Stories.json';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import QuestionBlock from '../StoryQuestionBlock/QuestionBlock';
import './StoryGame.css';
import NavBar from '../navBar/navBar';

const images = import.meta.glob('../../assets/images/*.png', { eager: true });
function getImage(fileName) {
  const path = `../../assets/images/${fileName}`;
  return images[path]?.default || null;
}

function StoryGame({ onFinish }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storyId, currentPage } = useSelector((state) => state.story);

  const [answeredCorrectly, setAnsweredCorrectly] = useState({}); // Estado modificado para manejar varias respuestas

  const story = storyId
    ? Stories.find((s) => s.id === storyId)
    : Stories[Math.floor(Math.random() * Stories.length)];

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem('storyProgress'));
    if (storedProgress && storedProgress.storyId === story.id) {
      dispatch(startStory(storedProgress.storyId));
      dispatch(nextPage(storedProgress.currentPage));
    } else {
      dispatch(startStory(story.id));
    }
  }, [dispatch, story.id]);

  useEffect(() => {
    localStorage.setItem(
      'storyProgress',
      JSON.stringify({
        storyId: story.id,
        currentPage,
      })
    );
  }, [story.id, currentPage]);

  if (!story) return <p>Loading story...</p>;

  const page = story.pages[currentPage];
  const imageSrc = getImage(page.image);
  const isLastPage = currentPage === story.pages.length - 1;
  const hasQuestion = !!page.question;

  function handleNext() {
    if (isLastPage) {
      if (onFinish) {
        onFinish();
      }
      navigate('/');
    } else {
      dispatch(nextPage());
      setAnsweredCorrectly({});
    }
  }

  function handleAnswer(isCorrect, questionIndex) {
    setAnsweredCorrectly((prevState) => ({
      ...prevState,
      [questionIndex]: isCorrect,
    }));

    // Otorgar 2 monedas por cada respuesta correcta
    if (isCorrect) {
      dispatch(registerCorrect());
      dispatch(addCoins(2)); // Otorgar 2 monedas por respuesta correcta
    }
  }

  return (
    <div className="story-container">
      <NavBar />
      <Header type="story" title="Read the story" />
      <div className="story-content">
        <h2 className="story-title">{story.title}</h2>
        {imageSrc && <img src={imageSrc} alt="Story scene" className="story-image" />}
        <p className="story-text">{page.text}</p>
        {hasQuestion && 
          <QuestionBlock 
            question={page.question} 
            onAnswer={handleAnswer} 
            questionIndex={currentPage} // Pass the current page index to track questions
          />
        }
        <NextButton
          onClick={handleNext}
          disabled={hasQuestion && Object.keys(answeredCorrectly).length < page.question.length} // Only enable next if all questions are answered
          label={isLastPage ? 'Back to Dashboard' : 'Next'}
        />
      </div>
    </div>
  );
}

export default StoryGame;

