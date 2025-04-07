import { useEffect, useState, useMemo } from 'react';
import CardGroup from '../CardGroup/CardGroup';
import PreguntaHeader from '../PreguntaHeader/PreguntaHeader';
import BotonSiguiente from '../BotonSiguiente/BotonSiguiente';
import './Asociacion.css';

import asociaciones from '../../data/asociaciones.json';

// ✅ Cargar imágenes desde assets
const imagenes = import.meta.glob('../../assets/images/*.png', { eager: true });
const getImage = (nombre) => {
  const path = `../../assets/images/${nombre}.png`;
  return imagenes[path]?.default || '';
};

const Asociacion = ({ id, onSuccess }) => {
  const actividad = asociaciones.find((a) => a.id === id);

  const barajadas = useMemo(() => {
    const pares = actividad?.pairs || [];

    const mezcladas = pares.flatMap((pair) => [
      { id: pair.item, image: getImage(pair.item), pairId: pair.match },
      { id: pair.match, image: getImage(pair.match), pairId: pair.item },
    ]);

    return mezcladas.sort(() => Math.random() - 0.5);
  }, [actividad]);

  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [resueltos, setResueltos] = useState([]);

  useEffect(() => {
    setCards(barajadas);
    setSelected([]);
    setResueltos([]);
  }, [barajadas]);

  const handleCardClick = (cardId) => {
    if (resueltos.includes(cardId) || selected.includes(cardId)) return;

    const nuevaSeleccion = [...selected, cardId];
    setSelected(nuevaSeleccion);

    if (nuevaSeleccion.length === 2) {
      const [id1, id2] = nuevaSeleccion;
      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);

      const sonCorrectos = card1?.pairId === card2?.id;

      if (sonCorrectos) {
        setResueltos((prev) => [...prev, id1, id2]);
        actualizarCorrectos([id1, id2], true);
      } else {
        actualizarCorrectos([id1, id2], false);
        setTimeout(() => actualizarCorrectos([id1, id2], null), 800);
      }

      setTimeout(() => setSelected([]), 800);
    }
  };

  const actualizarCorrectos = (ids, estado) => {
    setCards((prev) =>
      prev.map((card) =>
        ids.includes(card.id) ? { ...card, correct: estado } : card
      )
    );
  };

  if (!actividad) return <p>Actividad no encontrada.</p>;

  return (
    <div className="asociacion-container">
      <PreguntaHeader tipo={actividad.type} titulo={actividad.title} />
      <CardGroup cards={cards} onCardClick={handleCardClick} />
      <BotonSiguiente
        onClick={onSuccess}
        disabled={resueltos.length !== cards.length}
      />
    </div>
  );
};

export default Asociacion;

