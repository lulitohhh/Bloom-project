import "./PageLeft.css"
import { useState } from "react";
import { useEffect } from "react";


const PageLeft = ({ 
  selectedCategory, 
  setSelectedCategory, 
  data = [], 
  selectedItem, 
  setSelectedItem 
}) => {
  const [displayedItems, setDisplayedItems] = useState([]);

  // Actualizar los items mostrados cuando cambian los datos o el item seleccionado
  useEffect(() => {
    setDisplayedItems(data.slice(0, 9));
  }, [data]);

  return (
    <div className="page-left">
      {!selectedCategory && (
        <div className="btns-wrapper">
          <div className="btn-containerplus">
            <img
              src="/assets/btn-plants.png"
              alt="Plants"
              className="img-btn"
              onClick={() => setSelectedCategory("plants")}
              style={{ cursor: "pointer" }}
            />
            <p className="btn-label">Plants</p>
          </div>
        </div>
      )}

      {selectedCategory && (
        <div className="grid-wrapper">
          <div className="grid-3-columns">
            {displayedItems.map((item) => (
              <div
                key={item.id}  // Usamos el ID de Firestore como key
                className={`grid-item ${
                  selectedItem?.id === item.id ? "selected" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "/assets/default-image.png"; // Imagen de respaldo
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLeft;
