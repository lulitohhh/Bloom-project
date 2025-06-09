import "./dashboard.css";
import Background from "../../components/background/background";
import Pot from "../../components/pot/pot";
import EcoButton from "../../components/ecoButton/ecoButton";
import ActivitiesBton from "../../components/activitiesBton/activitiesBton";
import NavBar from "../../components/navBar/navBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([null, null, null]);
  const [centralPlantId, setCentralPlantId] = useState(null);
  const [currentGroupStart, setCurrentGroupStart] = useState(0);
  const [groupCentralIndices, setGroupCentralIndices] = useState({});
  

  useEffect(() => {
    if (!auth.user?.uid) return;

    const userRef = doc(db, "users", auth.user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          let loadedPlants = Array.isArray(userData.plants)
            ? [...userData.plants]
            : [];
          const totalPots = Math.min(userData.pots || 3, 9);

          while (loadedPlants.length < totalPots) {
            loadedPlants.push(null);
          }

          const centralId = userData.centralPlantId || null;
          setCentralPlantId(centralId);
          setPlants(loadedPlants);
        } else {
          setPlants([null, null, null]);
          setCentralPlantId(null);
        }
      },
      (error) => {
        console.error("Error al escuchar datos en tiempo real:", error);
        setPlants([null, null, null]);
        setCentralPlantId(null);
      }
    );

    return () => unsubscribe();
  }, [auth.user]);

  const handleSelectCentralPot = async (selectedIndex) => {
    const selectedPlant = plants[selectedIndex];
    if (!selectedPlant || selectedPlant.id === centralPlantId) return;

    const userRef = doc(db, "users", auth.user.uid);
    await updateDoc(userRef, {
      centralPlantId: selectedPlant.id,
    });

    const groupStart = Math.floor(selectedIndex / 3) * 3;
    setGroupCentralIndices((prev) => ({
      ...prev,
      [groupStart]: selectedIndex,
    }));
  };

  const visiblePlants = plants.slice(currentGroupStart, currentGroupStart + 3);

  // ¿Hay una planta central guardada para esta página?
  let fallbackCentralIndex = groupCentralIndices[currentGroupStart];
  if (
    fallbackCentralIndex === undefined ||
    fallbackCentralIndex < currentGroupStart ||
    fallbackCentralIndex >= currentGroupStart + 3
  ) {
    // Si no hay planta guardada válida, por defecto tomamos la del medio si existe
    fallbackCentralIndex = plants.findIndex((p) => p?.id === centralPlantId);
    if (
      fallbackCentralIndex < currentGroupStart ||
      fallbackCentralIndex >= currentGroupStart + 3
    ) {
      fallbackCentralIndex = currentGroupStart + 1;
    }
  }

  // Índice relativo (0–2) para el grupo visible
  const centralVisibleIndex = fallbackCentralIndex - currentGroupStart;

  return (
    

    <div className="dashboard">
      <Background />
      <NavBar />

      <>
        <button
          className="carousel-arrow left"
          onClick={() => setCurrentGroupStart((prev) => Math.max(prev - 3, 0))}
          disabled={currentGroupStart === 0}
          aria-label="Anterior"
        >
          ‹
        </button>

        <button
          className="carousel-arrow right"
          onClick={() =>
            setCurrentGroupStart((prev) =>
              Math.min(prev + 3, Math.max(plants.length - 3, 0))
            )
          }
          disabled={currentGroupStart + 3 >= plants.length}
          aria-label="Siguiente"
        >
          ›
        </button>
      </>

      <div className="pots-container">
        {visiblePlants.map((plantData, index) => {
          const realIndex = currentGroupStart + index;
          const isCentral = plantData?.id === centralPlantId;

          let positionClass = "";

          if (centralVisibleIndex === index) {
            positionClass = "pot-position-center";
          } else {
            // Las posiciones se asignan en relación a la planta central visible
            // Se distribuyen como izquierda y derecha alrededor de ella
            if (centralVisibleIndex === 0) {
              // Si la central es la primera del grupo
              positionClass =
                index === 1 ? "pot-position-right" : "pot-position-left";
            } else if (centralVisibleIndex === 1) {
              // Si la central está al medio
              positionClass =
                index === 0 ? "pot-position-left" : "pot-position-right";
            } else {
              // Si la central es la última del grupo
              positionClass =
                index === 0 ? "pot-position-left" : "pot-position-right";
            }
          }

          return (
            <Pot
              key={`pot-${realIndex}-${plantData?.id || "empty"}`}
              plantData={plantData ? { ...plantData } : null}
              potIndex={realIndex}
              onSelectCentralPot={handleSelectCentralPot}
              className={positionClass}
              isCentral={isCentral}
            />
          );
        })}
      </div>

      <div className="btn-container">
        <EcoButton />
        <ActivitiesBton />
      </div>
    </div>
  );
};

export default Dashboard;
