import "./PageLeft.css"
import { useState } from "react";
import { useEffect } from "react";
import cloudinaryImages from '../../utils/cloudinaryImages';


const PageLeft = ({ 
  selectedCategory, 
  setSelectedCategory, 
  data = [], 
  selectedItem, 
  setSelectedItem,
  purchasedItems
}) => {
  const [displayedItems, setDisplayedItems] = useState([]);

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
            {displayedItems.map((item) => {
              const isPurchased = purchasedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`grid-item ${
                    selectedItem?.id === item.id ? "selected" : ""
                  }`}
                  onClick={() => isPurchased && setSelectedItem(item)}
                  style={{ cursor: isPurchased ? "pointer" : "not-allowed" }}
                >
                  <img
                    src={isPurchased ? item.image : cloudinaryImages.locked}
                    alt={isPurchased ? item.name : "Bloqueado"}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = "/assets/default-image.png";
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLeft;