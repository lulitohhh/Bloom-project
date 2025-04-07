import './Card.css';

const Card = ({ data, onClick }) => {
  return (
    <div
      className={`card ${data.selected ? 'selected' : ''} ${data.correct === true ? 'correct' : ''} ${data.correct === false ? 'incorrect' : ''}`}
      onClick={onClick}
    >
      <img src={data.image} alt={data.id} className="card-image" />
    </div>
  );
};

export default Card;
