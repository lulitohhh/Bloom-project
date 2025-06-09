import NavBar from "../../components/navBar/navBar";
import Background from "../../components/background/background";
import Album from "../../components/Album/Album";
import "./GardenAlbum.css";
import { useState, useEffect } from "react";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant";

const GardenAlbum = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

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
