import "./PageRight"
import ItemCard from "../ItemCard/ItemCard"; // Asegúrate de que esta ruta sea correcta

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
        <div className="card-wrapper">
          <ItemCard item={selectedItem} type={selectedCategory} />
          <img
            src="/assets/buttoms/back-btn.png"
            alt="Back"
            className="back-btn"
            onClick={() => {
              setSelectedCategory(null);
              setSelectedItem(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PageRight;