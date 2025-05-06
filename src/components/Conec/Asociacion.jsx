import { useEffect, useState } from 'react';
import CardGroup from '../CardGroup/CardGroup';
import Header from '../Header/Header';
import BotonSiguiente from '../NextButton/BotonSiguiente';
import './Asociacion.css';
import NavBar from '../navBar/navBar'

import asociaciones from '../../data/asociaciones.json';

// Cargar imágenes desde assets
const imagenes = import.meta.glob('../../assets/images/*.png', { eager: true });

function getImage(nombre) {
  const path = `../../assets/images/${nombre}.png`;
  if (imagenes[path]) {
    return imagenes[path].default;
  }
  return '';
}

function Asociacion({ id, onSuccess }) {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [resueltos, setResueltos] = useState([]);

  const actividad = asociaciones.find((a) => a.id === id);

  useEffect(() => {
    if (actividad) {
      const pares = actividad.pairs || [];
      let barajadas = [];

      for (let i = 0; i < pares.length; i++) {
        const pair = pares[i];

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

        barajadas.push(itemCard);
        barajadas.push(matchCard);
      }

      // Mezclar manualmente
      for (let i = barajadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = barajadas[i];
        barajadas[i] = barajadas[j];
        barajadas[j] = temp;
      }

      setCards(barajadas);
      setSelected([]);
      setResueltos([]);
    }
  }, [actividad]);

  function handleCardClick(cardId) {
    if (resueltos.includes(cardId)) return;
    if (selected.includes(cardId)) return;

    const nuevaSeleccion = [...selected, cardId];
    setSelected(nuevaSeleccion);

    if (nuevaSeleccion.length === 2) {
      const id1 = nuevaSeleccion[0];
      const id2 = nuevaSeleccion[1];

      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);

      const sonCorrectos = card1 && card2 && card1.pairId === card2.id;

      if (sonCorrectos) {
        setResueltos((prev) => [...prev, id1, id2]);
        actualizarCorrectos([id1, id2], true);
      } else {
        actualizarCorrectos([id1, id2], false);
        setTimeout(() => {
          actualizarCorrectos([id1, id2], null);
        }, 800);
      }

      setTimeout(() => {
        setSelected([]);
      }, 800);
    }
  }

  function actualizarCorrectos(ids, estado) {
    const nuevasCartas = cards.map((card) => {
      if (ids.includes(card.id)) {
        return { ...card, correct: estado };
      }
      return card;
    });

    setCards(nuevasCartas);
  }

  if (!actividad) {
    return <p>Actividad no encontrada.</p>;
  }

  return (
    <div className="asociacion-container">
      
      <Header tipo={actividad.type} titulo={actividad.title} />
      <CardGroup cards={cards} onCardClick={handleCardClick} selected={selected} />
      <BotonSiguiente
        onClick={onSuccess}
        disabled={resueltos.length !== cards.length}
      />
    </div>
  );
}

export default Asociacion;

