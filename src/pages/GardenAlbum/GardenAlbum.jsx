import { useState, useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import Background from "../../components/background/background";
import Album from "../../components/Album/Album";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant"; // asegúrate de tenerlo creado
import "./GardenAlbum.css";

const GardenAlbum = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // simulación de carga por 2 segundos

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoaderPlant />;

  return (
    <>
      <Background />
      <NavBar />
      <Album />
    </>
  );
};

export default GardenAlbum;
