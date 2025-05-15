import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import PageLeft from "../PageLeft/PageLeft";
import PageRight from "../PageRight/PageRight";
import { useFirestoreData } from "../../data/userFirestoreData";
import "./Album.css";

const Album = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const userId = useSelector((state) => state.auth.user?.uid);

  // Obtener items comprados por el usuario
  useEffect(() => {
    const fetchPurchasedItems = async () => {
      if (userId) {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setPurchasedItems(userDoc.data().purchasedItems || []);
        }
      }
    };
    fetchPurchasedItems();
  }, [userId]);

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
            purchasedItems={purchasedItems}
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
