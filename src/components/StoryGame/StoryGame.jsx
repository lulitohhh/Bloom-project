// src/components/StoryGame/StoryGame.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startStory,
  nextPage,
  registerCorrect,
} from '../../redux/Activities/storySlice';
import { useNavigate } from 'react-router-dom';
import Stories from '../../data/Stories.json';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import QuestionBlock from '../StoryQuestionBlock/QuestionBlock';
import './StoryGame.css';

const images = import.meta.glob('../../assets/images/*.png', { eager: true });
function getImage(fileName) {
  const path = `../../assets/images/${fileName}`;
  return images[path]?.default || null;
}

function StoryGame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storyId, currentPage, correctAnswers } = useSelector((state) => state.story);

  const story = storyId
    ? Stories.find((s) => s.id === storyId)
    : Stories[Math.floor(Math.random() * Stories.length)];

  useEffect(() => {
    if (!storyId) {
      dispatch(startStory(story.id));
    }
  }, [dispatch, storyId, story.id]);

  if (!story) return <p>Loading story...</p>;

  const page = story.pages[currentPage];
  const imageSrc = getImage(page.image);
  const isLastPage = currentPage === story.pages.length - 1;
  const hasQuestion = !!page.question;

  function handleNext() {
    if (isLastPage) {
      navigate('/');
    } else {
      dispatch(nextPage());
    }
  }

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      dispatch(registerCorrect());
    }
  }

  return (
    <div className="story-container">
      <Header type="story" title="Read the story" />
      <div className="story-content">
        <h2 className="story-title">{story.title}</h2>
        {imageSrc && <img src={imageSrc} alt="Story scene" className="story-image" />}
        <p className="story-text">{page.text}</p>
        {hasQuestion && <QuestionBlock question={page.question} onAnswer={handleAnswer} />}
        <NextButton
          onClick={handleNext}
          disabled={hasQuestion && correctAnswers <= currentPage}
          label={isLastPage ? 'Back to Dashboard' : 'Next'}
        />
      </div>
    </div>
  );
}

export default StoryGame;
