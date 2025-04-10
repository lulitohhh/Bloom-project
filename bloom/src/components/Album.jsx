import { useState } from "react";
import PageLeft from "./PageLeft";
import PageRight from "./PageRight";

const Album = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="album-container">
      <PageLeft setSelectedCategory={setSelectedCategory} />
      <PageRight selectedCategory={selectedCategory} />
    </div>
  );
};

export default Album;
