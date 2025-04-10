import { useState } from "react";
import PageLeft from "../components/PageLeft";
import PageRight from "../components/PageRight";
import NavBar from "../components/navBar/navBar";
import { plants, ecosystems } from "../components/ItemData";
import "../styles/GardenAlbum.css";
import Background from "../components/background/background";
import EcoButton from '../components/ecoButton/ecoButton';
import ActivitiesBton from '../components/activitiesBton/activitiesBton';

const GardenAlbum = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const data =
    selectedCategory === "plants"
      ? plants
      : selectedCategory === "ecosystems"
      ? ecosystems
      : [];

  return (
    <>
      <Background />
      <NavBar />
      <div className="garden-album">
  

  {/* Imagen del fondo del álbum como decoración */}
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

  <div className="fixed-buttons">
    <EcoButton/>
    <ActivitiesBton/>
  </div>
</div>


    </>
  );
};

export default GardenAlbum;
