const PageRight = ({ setSelectedCategory, selectedItem, setSelectedItem, selectedCategory }) => {
  return (
    <div className="page-right">
      {!selectedCategory && !selectedItem && (
        <img
          src="/assets/btn-ecosystems.png"
          alt="Ecosystems"
          className="img-btn"
          onClick={() => {
            setSelectedCategory("ecosystems");
            setSelectedItem(null);
          }}
          style={{ cursor: "pointer" }}
        />
      )}

      {selectedItem && (
        <div className="item-details">
          <h2>{selectedItem.name}</h2>
          <img src={selectedItem.image} alt={selectedItem.name} style={{ width: "100%", maxWidth: "300px" }} />
          <p><strong>Description:</strong> {selectedItem.description}</p>
          <p><strong>Animals:</strong> {selectedItem.animals}</p>
          <p><strong>Plants:</strong> {selectedItem.plants}</p>
          <p><strong>Location:</strong> {selectedItem.location}</p>

          <button
  onClick={() => {
    setSelectedCategory(null);
    setSelectedItem(null);
  }}
  style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
>
  ← Back
</button>

        </div>
      )}
    </div>
  );
};

export default PageRight;
