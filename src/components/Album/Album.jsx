import { useState } from "react";
import PageLeft from "../PageLeft/PageLeft";
import PageRight from "../PageRight/PageRight";
import { useFirestoreData } from "../../data/userFirestoreData";
import "./Album.css";

const Album = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Usamos el custom hook para obtener los datos de Firestore
  const { data, loading, error } = useFirestoreData(selectedCategory);

  if (loading && selectedCategory) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">Error al cargar los datos: {error.message}</div>;
  }

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