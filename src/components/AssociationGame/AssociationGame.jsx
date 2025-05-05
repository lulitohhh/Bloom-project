// src/components/AssociationGame/AssociationGame.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPairs, selectCard, clearSelection, markResolved } from '../../redux/Activities/associationSlice';
import { addCoins } from '../../redux/coinSlice'; 
import CardGroup from '../CardGroup/CardGroup';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import Association from '../../data/Association.json';
import './AssociationGame.css';
import NavBar from '../navBar/navBar';

const images = import.meta.glob('../../assets/images/*.png', { eager: true });
function getImage(nombre) {
  const path = `../../assets/images/${nombre}.png`;
  return images[path]?.default || '';
}

function AssociationGame({ id, onSuccess }) {
  const dispatch = useDispatch();
  const { currentPairs, selected, resolved } = useSelector((state) => state.association);

  // 🧠 El useEffect ahora depende de id, no de activity
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

      // Mezclar
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      dispatch(setPairs(shuffled));
    }
  }, [dispatch, id]); // ✅ 'id' es la dependencia clave

  // ✔ Solo añade monedas una vez completado
  useEffect(() => {
    if (resolved.length === currentPairs.length && currentPairs.length > 0) {
      dispatch(addCoins(5));
    }
  }, [resolved, currentPairs.length, dispatch]);

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

  // Actividad encontrada por ID (por si el JSON está mal formateado)
  const activity = Association.find((a) => a.id === id);
  if (!activity) return <p>Actividad no encontrada</p>;

  return (
    <div className="asociacion-container">
      <NavBar/>
      <Header type={activity.type} title={activity.title} />
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
      <NextButton
        onClick={onSuccess}
        disabled={resolved.length !== currentPairs.length}
      />
    </div>
  );
}

export default AssociationGame;
