import NavBar from "../../components/navBar/navBar";
import Background from "../../components/background/background";
import EcoButton from '../../components/ecoButton/ecoButton';
import ActivitiesBton from '../../components/activitiesBton/activitiesBton';
import Album from "../../components/Album/Album";
import "./GardenAlbum.css";

const GardenAlbum = () => {
  return (
    <>
      <Background />
      <NavBar />
      <Album />
      <div className="fixed-buttons">
        <EcoButton />
        <ActivitiesBton />
      </div>
    </>
  );
};

export default GardenAlbum;
