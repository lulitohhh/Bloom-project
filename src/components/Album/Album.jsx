import { useState } from "react";
import PageLeft from "../PageLeft/PageLeft";
import PageRight from "../PageRight/PageRight";
import { plants, ecosystems } from "../ItemData/ItemData";
import "./Album.css"

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
    <div className="garden-album">
      {/* Fondo del álbum */}
      <img src="/assets/album.png" className="album-bg" alt="Fondo del álbum" />

      <div className="container">
        <PageLeft
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          data={data}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />

        <PageRight
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default Album;
