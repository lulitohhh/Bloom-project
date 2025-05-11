import './AssociationGame.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPairs, selectCard, clearSelection, markResolved } from '../../redux/Activities/associationSlice';
import { addCoins } from '../../redux/coinSlice';  // Para dar las monedas
import CardGroup from '../CardGroup/CardGroup';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import Association from '../../data/Association.json';
import NavBar from '../navBar/navBar';

const images = import.meta.glob('../../assets/images/*.png', { eager: true });
function getImage(nombre) {
  const path = `../../assets/images/${nombre}.png`;
  return images[path]?.default || '';
}

function AssociationGame({ id, onSuccess }) {
  const dispatch = useDispatch();
  const { currentPairs, selected, resolved } = useSelector((state) => state.association);
  const [hasAwarded, setHasAwarded] = useState(false);  // Flag para evitar dar monedas múltiples veces

  // Reiniciar las cartas cuando cambiamos de actividad
  useEffect(() => {
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

      // Mezclar las cartas
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      dispatch(setPairs(shuffled));
      dispatch(clearSelection());  // Limpiar la selección cuando cambiamos de actividad
      setHasAwarded(false);  // Resetear la flag para las monedas
    }
  }, [dispatch, id]);

  // Otorgar 6 monedas cuando todas las parejas están resueltas
  useEffect(() => {
    if (resolved.length === currentPairs.length && !hasAwarded) {
      dispatch(addCoins(6));  // Otorgar 6 monedas
      setHasAwarded(true);  // Evitar que se otorguen monedas más de una vez
    }
  }, [resolved, currentPairs, dispatch, hasAwarded]);

  // Manejo del clic en las cartas
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
    <>
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
    </>
  );
}

export default AssociationGame;
