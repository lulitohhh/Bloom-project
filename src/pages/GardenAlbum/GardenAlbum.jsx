import React, { useState, useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import Background from "../../components/background/background";
import EcoButton from '../../components/ecoButton/ecoButton';
import ActivitiesBton from '../../components/activitiesBton/activitiesBton';
import Album from "../../components/Album/Album";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant";
import "./GardenAlbum.css";

const GardenAlbum = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carga de datos o lo que necesites cargar
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de carga (ajusta a tu necesidad)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoaderPlant />;
  }

  return (
    <>
      <Background />
      <NavBar />
      <Album />
      <div className="btn-container">
        <EcoButton/>
        <ActivitiesBton/>
      </div>
    </>
  );
};

export default GardenAlbum;
