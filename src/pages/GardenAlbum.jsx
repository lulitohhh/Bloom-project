import { useState } from "react";
import PageLeft from "../components/PageLeft";
import PageRight from "../components/PageRight";
import NavBar from "../components/NavBar";
import { plants, ecosystems } from "../components/ItemData";
import boton1 from "/assets/buttoms/Botón-1.png";
import boton2 from "/assets/buttoms/Botón-4.png";
import "../styles/GardenAlbum.css";

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
      <NavBar />
      <div className="garden-album">
  <img src="/assets/Nubes.png" className="bg-img img1" alt="Nubes" />
  <img src="/assets/Union.png" className="bg-img img2" alt="Unión cielo-pasto" />
  <img src="/assets/Group 14.png" className="bg-img img3" alt="Decoración en el pasto" />

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
    <button className="image-button" onClick={() => console.log("Botón 1 clickeado")}>
      <img src={boton1} alt="Botón 1" />
    </button>
    <button className="image-button" onClick={() => console.log("Botón 2 clickeado")}>
      <img src={boton2} alt="Botón 2" />
    </button>
  </div>
</div>


    </>
  );
};

export default GardenAlbum;
