const PageLeft = ({ selectedCategory, setSelectedCategory, data, setSelectedItem }) => {
  return (
    <div className="page-left">
      {!selectedCategory && (
        <img
          src="/assets/btn-plants.png"
          alt="Plants"
          className="img-btn"
          onClick={() => setSelectedCategory("plants")}
          style={{ cursor: "pointer" }}
        />
      )}

      {selectedCategory && (
        <div className="grid-3-columns">
          {data.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              onClick={() => setSelectedItem(item)}
              style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageLeft;
