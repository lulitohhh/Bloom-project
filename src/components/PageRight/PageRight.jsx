import "./PageRight"

const PageRight = ({ setSelectedCategory, selectedItem, setSelectedItem, selectedCategory }) => {
  return (
    <div className="page-right">
      {!selectedCategory && !selectedItem && (
        <div className="btns-wrapper">
          <div className="btn2-container">
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
            <p className="btn-label">Ecosystems</p>
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="item-details">
          <img
            src="/assets/buttoms/back-btn.png"
            alt="Back"
            className="back-btn"
            onClick={() => {
              setSelectedCategory(null);
              setSelectedItem(null);
            }}
          />

          <h2>{selectedItem.name}</h2>

          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="item-img"
          />

          <p><strong>Description:</strong> {selectedItem.description}</p>

          {selectedCategory === "ecosystems" && (
            <>
              <p><strong>Animals:</strong> {selectedItem.animals}</p>
              <p><strong>Plants:</strong> {selectedItem.plants}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
            </>
          )}

          {selectedCategory === "plants" && (
            <>
              <p><strong>Kingdom:</strong> {selectedItem.kingdom}</p>
              <p><strong>Genus:</strong> {selectedItem.genus}</p>
              <p><strong>Habitat:</strong> {selectedItem.habitat}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PageRight;
