import Card from '../Card/Card';
import './CardGroup.css';

const CardGroup = ({ cards, onCardClick, selected }) => {
  return (
    <div className="card-group">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          isSelected={selected.includes(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGroup;
