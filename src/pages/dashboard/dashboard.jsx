
import "./dashboard.css"
import Background from '../../components/background/background';
import BigPot from '../../components/BigPot/BigPot';
import Pot from '../../components/pot/pot';
import EcoButton from '../../components/ecoButton/ecoButton';
import ActivitiesBton from '../../components/activitiesBton/activitiesBton';
import BackButton from '../../components/backBton/BackBton';
import ShopBton from '../../components/shopBton/shopBton';
import ProfileBton from '../../components/profileBton/profileBton';
import CoinCounter from '../../components/Coin/Coin';
import NavBar from '../../components/navBar/navBar';


const Dashboard = () => {


  return (
    <div className='dashboard'>
      <Background />
      <NavBar/>
      <div className="pots-container">
        <Pot />
        <BigPot /> 
        <Pot />
      </div>
      <div className="btn-container">
        <EcoButton/>
        <ActivitiesBton/>
      </div>
    </div>
  );
};

export default Dashboard;