import { useEffect, useState } from 'react';
import CardGroup from '../CardGroup/CardGroup';
import Header from '../Header/Header';
import NextButton from '../NextButton/NextButton';
import './AssociationGame.css';
import NavBar from '../navBar/navBar'

import Association from '../../data/Association.json';

// Cargar imágenes desde assets
const images = import.meta.glob('../../assets/images/*.png', { eager: true });

function getImage(nombre) {
  const path = `../../assets/images/${nombre}.png`;
  if (images[path]) {
    return images[path].default;
  }
  return '';
}

function AssociationGame({ id, onSuccess }) {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [resueltos, setResueltos] = useState([]);

  const activity = Association.find((a) => a.id === id);

  useEffect(() => {
    if (activity) {
      const pairs = activity.pairs || [];
      let shuffled = [];

      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        const itemCard = {
          id: pair.item,
          image: getImage(pair.item),
          pairId: pair.match,
        };

        const matchCard = {
          id: pair.match,
          image: getImage(pair.match),
          pairId: pair.item,
        };

        shuffled.push(itemCard);
        shuffled.push(matchCard);
      }

      // Mezclar manualmente
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }

      setCards(shuffled);
      setSelected([]);
      setResueltos([]);
    }
  }, [activity]);

  function handleCardClick(cardId) {
    if (resueltos.includes(cardId)) return;
    if (selected.includes(cardId)) return;

    const newSelection = [...selected, cardId];
    setSelected(newSelection);

    if (newSelection.length === 2) {
      const id1 = newSelection[0];
      const id2 = newSelection[1];

      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);

      const areCorrect = card1 && card2 && card1.pairId === card2.id;

      if (areCorrect) {
        setResueltos((prev) => [...prev, id1, id2]);
        updateCorrect([id1, id2], true);
      } else {
        updateCorrect([id1, id2], false);
        setTimeout(() => {
          updateCorrect([id1, id2], null);
        }, 800);
      }

      setTimeout(() => {
        setSelected([]);
      }, 800);
    }
  }

  function updateCorrect(ids, estado) {
    const nuevasCartas = cards.map((card) => {
      if (ids.includes(card.id)) {
        return { ...card, correct: estado };
      }
      return card;
    });

    setCards(nuevasCartas);
  }

  if (!activity) {
    return <p>Actividad no encontrada.</p>;
  }

  return (
    <div className="asociacion-container">
      
      <Header type={activity.type} title={activity.title} />
      <CardGroup cards={cards} onCardClick={handleCardClick} selected={selected} />
      <NextButton
        onClick={onSuccess}
        disabled={resueltos.length !== cards.length}
      />
    </div>
  );
}

export default AssociationGame;

