const PageLeft = ({ selectedCategory, setSelectedCategory, data = [], selectedItem, setSelectedItem }) => {
  return (
    <div className="page-left">
      {!selectedCategory && (
        <div className="btns-wrapper">
          <div className=".btn-containerplus">
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
      {data.slice(0, 9).map((item, index) => (
        <div
          key={index}
          className={`grid-item ${selectedItem?.name === item.name ? "selected" : ""}`}
          onClick={() => setSelectedItem(item)}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
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
