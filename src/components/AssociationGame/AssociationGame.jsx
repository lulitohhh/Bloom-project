import './AssociationGame.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPairs, selectCard, clearSelection, markResolved, resetAssociation } from '../../redux/Activities/associationSlice';
import CardGroup from '../CardGroup/CardGroup';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';

import NavBar from '../navBar/navBar';
import { addSessionCoins } from '../../redux/sessionCoinsSlice';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';


import cloudinaryImages from '../../utils/cloudinaryImages';

function getImage(nombre) {
  return cloudinaryImages[nombre] || '';
}

function AssociationGame({ id, onSuccess }) {
  const dispatch = useDispatch();
  const { currentPairs, selected, resolved } = useSelector((state) => state.association);
  const hasAwarded = useRef(false);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    async function fetchData() {
      dispatch(resetAssociation());
      hasAwarded.current = false;

      const ref = doc(db, 'association', id.toString());
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setActivity(data);

        const pairs = data.pairs || [];
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
      } else {
        console.error('No such document!');
      }
    }

    fetchData();
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

      setTimeout(() => {
        if (match) {
          dispatch(markResolved([id1, id2]));
        }
        dispatch(clearSelection());
      }, 800);
    }
  }

  if (!activity) return <p>Cargando actividad...</p>;

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