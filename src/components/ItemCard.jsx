const ItemCard = ({ item, type }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>

      {type === "plants" ? (
        <ul>
          <li><strong>Kingdom:</strong> {item.kingdom}</li>
          <li><strong>Genus:</strong> {item.genus}</li>
          <li><strong>Habitat:</strong> {item.habitat}</li>
        </ul>
      ) : (
        <ul>
          <li><strong>Animals:</strong> {item.animals}</li>
          <li><strong>Plants:</strong> {item.plants}</li>
          <li><strong>Location:</strong> {item.location}</li>
        </ul>
      )}
    </div>
  );
};

export default ItemCard;
