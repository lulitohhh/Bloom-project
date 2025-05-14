import './AssociationGame.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPairs, selectCard, clearSelection, markResolved, resetAssociation } from '../../redux/Activities/associationSlice';
import CardGroup from '../CardGroup/CardGroup';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import Association from '../../data/Association.json';
import NavBar from '../navBar/navBar';
import { addSessionCoins } from '../../redux/sessionCoinsSlice';

const images = import.meta.glob('../../assets/images/*.webp', { eager: true });
function getImage(nombre) {
  const path = `../../assets/images/${nombre}.webp`;
  return images[path]?.default || '';
}

function AssociationGame({ id, onSuccess }) {
  const dispatch = useDispatch();
  const { currentPairs, selected, resolved } = useSelector((state) => state.association);
  const hasAwarded = useRef(false); 

  useEffect(() => {
  dispatch(resetAssociation()); 

  const activity = Association.find((a) => a.id === id);
  if (activity) {
    const pairs = activity.pairs || [];
    const shuffled = [];

    for (let pair of pairs) {
      const item = {
        id: pair.item,
        image: getImage(pair.item),
        pairId: pair.match,
      };
      const match = {
        id: pair.match,
        image: getImage(pair.match),
        pairId: pair.item,
      };
      shuffled.push(item, match);
    }

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    dispatch(setPairs(shuffled));
    dispatch(clearSelection());
    hasAwarded.current = false;
  }
}, [dispatch, id]);

  useEffect(() => {
  const activityCompleted = currentPairs.length > 0 && resolved.length === currentPairs.length;

  if (activityCompleted && !hasAwarded.current) {
    dispatch(addSessionCoins(3));
    hasAwarded.current = true;
  }
}, [resolved, currentPairs, dispatch]);


  function handleCardClick(cardId) {
    if (resolved.includes(cardId) || selected.includes(cardId)) return;

    dispatch(selectCard(cardId));

    if (selected.length === 1) {
      const id1 = selected[0];
      const id2 = cardId;

      const card1 = currentPairs.find((c) => c.id === id1);
      const card2 = currentPairs.find((c) => c.id === id2);

      const match = card1?.pairId === card2?.id;

      if (match) {
        setTimeout(() => {
          dispatch(markResolved([id1, id2]));
          dispatch(clearSelection());
        }, 800);
      } else {
        setTimeout(() => {
          dispatch(clearSelection());
        }, 800);
      }
    }
  }

  const activity = Association.find((a) => a.id === id);
  if (!activity) return <p>Actividad no encontrada</p>;

  return (
    <section className='main-container'>
      <NavBar />
      <div className="asociacion-container">
        <Header type={activity.type} title={activity.title} />
        <section className="asociacion-box">
          <CardGroup
            cards={currentPairs.map((c) => ({
              ...c,
              correct: resolved.includes(c.id)
                ? true
                : selected.includes(c.id)
                ? 'selected'
                : null,
            }))}
            onCardClick={handleCardClick}
            selected={selected}
          />
        </section>
        <NextButton
          onClick={onSuccess}
          disabled={resolved.length !== currentPairs.length}
        />
      </div>
    </section>
  );
}

export default AssociationGame;
