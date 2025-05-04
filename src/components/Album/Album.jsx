import { useState } from "react";
import PageLeft from "../PageLeft/PageLeft";
import PageRight from "../PageRight/PageRight";
import { plants, ecosystems } from "../ItemData/ItemData";
import "./Album.css";

const Album = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const data =
    selectedCategory === "plants"
      ? plants
      : selectedCategory === "ecosystems"
      ? ecosystems
      : [];

  return (
    <div className="album-wrapper">
      <div className="album-image">
        <div className="page-left">
          <PageLeft
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            data={data}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
        <div className="page-right">
          <PageRight
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Album;
