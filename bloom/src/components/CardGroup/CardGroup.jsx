import Card from '../Card/Card';
import './CardGroup.css';

const CardGroup = ({ cards, onCardClick }) => {
  if (!cards) return null;

  return (
    <div className="card-group">
      {cards.map((card) => (
        <Card key={card.id} data={card} onClick={() => onCardClick(card.id)} />
      ))}
    </div>
  );
};

export default CardGroup;
