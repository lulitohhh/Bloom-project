import { Link } from "react-router-dom";
import homeIcon from "/assets/buttoms/Botón.png";
import aboutIcon from "/assets/buttoms/Botón-2.png";
import galleryIcon from "/assets/buttoms/Botón-3.png";
import contactIcon from "/assets/buttoms/life-bar.png";
import "../styles/NavBar.css"

const NavBar = () => {
  return (
<nav className="navbar">
  <div className="navbar-buttons">
    {/* Izquierda */}
    <div className="nav-left">
      <Link to="/home">
        <img src={homeIcon} alt="Home" className="nav-icon" />
      </Link>
      <Link to="/about">
        <img src={aboutIcon} alt="About" className="nav-icon" />
      </Link>
    </div>

    {/* Derecha */}
    <div className="nav-right">
      <Link to="/contact">
        <img src={contactIcon} alt="Contact" className="nav-icon" />
      </Link>
      <Link to="/gallery">
        <img src={galleryIcon} alt="Gallery" className="nav-icon" />
      </Link>
    </div>
  </div>
</nav>

  );
};

export default NavBar;
