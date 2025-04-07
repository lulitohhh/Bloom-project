// src/components/Card/Card.jsx
import './Card.css';

const Card = ({ card, onClick, isSelected }) => {
  let className = 'card';

  if (card.correct === true) className += ' correcta';
  else if (card.correct === false) className += ' incorrecta';
  else if (isSelected) className += ' seleccionada';

  return (
    <div className={className} onClick={() => onClick(card.id)}>
      <img src={card.image} alt={card.id} />
    </div>
  );
};

export default Card;
