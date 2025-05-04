import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stories from '../../data/Stories.json';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import QuestionBlock from '../StoryQuestionBlock/QuestionBlock'; // Make sure this file exists
import './StoryGame.css';

const images = import.meta.glob('../../assets/images/*.png', { eager: true });

function getImage(fileName) {
  const path = `../../assets/images/${fileName}`;
  return images[path]?.default || null;
}

function StoryGame() {
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const randomStory = Stories[Math.floor(Math.random() * Stories.length)];
    setStory(randomStory);
    setCurrentPage(0);
    setAnsweredCorrectly(null);
  }, []);

  function handleNext() {
    if (!story) return;

    const isLastPage = currentPage === story.pages.length - 1;

    if (isLastPage) {
      navigate('/'); // Redirect to dashboard or home
    } else {
      setCurrentPage(currentPage + 1);
      setAnsweredCorrectly(null);
    }
  }

  function handleAnswer(isCorrect) {
    setAnsweredCorrectly(isCorrect);
    // Optionally add coin rewards here
  }

  if (!story) return <p>Loading story...</p>;

  const page = story.pages[currentPage];
  const imageSrc = getImage(page.image);
  const isLastPage = currentPage === story.pages.length - 1;
  const hasQuestion = !!page.question;

  return (
    <div className="story-container">
      <Header type="story" title="Read the story" />

      <div className="story-content">
        <h2 className="story-title">{story.title}</h2>

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Story scene"
            className="story-image"
          />
        )}

        <p className="story-text">{page.text}</p>

        {hasQuestion && (
          <QuestionBlock question={page.question} onAnswer={handleAnswer} />
        )}

        <NextButton
          onClick={handleNext}
          disabled={hasQuestion && answeredCorrectly === null}
          label={isLastPage ? 'Back to Dashboard' : 'Next'}
        />
      </div>
    </div>
  );
}

export default StoryGame;
