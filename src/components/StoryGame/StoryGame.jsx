
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startStory, nextPage, registerCorrect } from '../../redux/Activities/storySlice';
import { addSessionCoins } from '../../redux/sessionCoinsSlice';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import QuestionBlock from '../StoryQuestionBlock/QuestionBlock';
import './StoryGame.css';
import NavBar from '../navBar/navBar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';


const images = import.meta.glob('../../assets/images/*.png', { eager: true });
function getImage(fileName) {
  const path = `../../assets/images/${fileName}`;
  return images[path]?.default || null;
}

function StoryGame({ onFinish }) {
  const dispatch = useDispatch();
  const { storyId, currentPage } = useSelector((state) => state.story);
  const [answeredCorrectly, setAnsweredCorrectly] = useState({});
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar historia desde Firestore
  useEffect(() => {
    const loadStory = async () => {
      try {
        let storyToLoad = storyId;

        // Si no hay storyId, seleccionamos una aleatoria
        if (!storyToLoad) {
          const randomId = Math.floor(Math.random() * 3) + 1; // Asumiendo que tienes 3 historias
          storyToLoad = randomId;
        }

        const docRef = doc(db, 'stories', storyToLoad.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const storyData = {
            id: docSnap.id,
            ...docSnap.data()
          };

          // Convertir pages de objeto a array ordenado si es necesario
          if (storyData.pages && !Array.isArray(storyData.pages)) {
            const pagesArray = Object.keys(storyData.pages)
              .sort((a, b) => Number(a) - Number(b))
              .map((key) => storyData.pages[key]);
            storyData.pages = pagesArray;
          }

          setStory(storyData);

          // Verificar progreso guardado
          const storedProgress = JSON.parse(localStorage.getItem('storyProgress'));
          if (storedProgress && storedProgress.storyId === docSnap.id) {
            dispatch(startStory(storedProgress.storyId));
            dispatch(nextPage(storedProgress.currentPage));
          } else {
            dispatch(startStory(docSnap.id));
          }
        } else {
          setError('Historia no encontrada');
        }
      } catch (err) {
        setError('Error al cargar la historia');
        console.error("Error loading story:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [dispatch, storyId]);

  
  useEffect(() => {
    if (story?.id && currentPage !== undefined) {
      localStorage.setItem(
        'storyProgress',
        JSON.stringify({
          storyId: story.id,
          currentPage,
        })
      );
    }
  }, [story?.id, currentPage]);

  if (loading) return <p>Cargando historia...</p>;
  if (error) return <p>{error}</p>;
  if (!story) return <p>No se pudo cargar la historia.</p>;

  const page = story.pages[currentPage];
  const imageSrc = getImage(page.image);
  const isLastPage = currentPage === story.pages.length - 1;
  const hasQuestion = !!page.question;

  function handleNext() {
  if (isLastPage) {
    if (onFinish) {
      onFinish(); 
    }
  } else {
    dispatch(nextPage(story.pages.length - 1)); // <-- Aquí se pasa el máximo índice permitido
    setAnsweredCorrectly({});
  }
}

  function handleAnswer(isCorrect, questionIndex) {
  setAnsweredCorrectly((prevState) => ({
    ...prevState,
    [questionIndex]: true,  // Aquí sólo indicas que se respondió, sin importar si es correcta o no
  }));

  if (isCorrect) {
    dispatch(registerCorrect());
    dispatch(addSessionCoins(3));
  }
}

  return (
    <section className="story-container">
      <NavBar />
      <Header type="story" title="Read the story" />
      <section className="story-content">
        <h2 className="story-title">{story.title}</h2>
        {imageSrc && <img src={imageSrc} alt="Story scene" className="story-image" />}
        <p className="story-text">{page.text}</p>
        {hasQuestion &&
          <QuestionBlock
            question={page.question}
            onAnswer={handleAnswer}
            questionIndex={currentPage}
          />
        }
        <NextButton
          onClick={handleNext}
          disabled={hasQuestion && !answeredCorrectly[currentPage]}
          label={isLastPage ? 'Back to Dashboard' : 'Next'}
        />
      </section>
    </section>
  );
}

export default StoryGame;