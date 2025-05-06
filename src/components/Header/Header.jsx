
import './Header.css';

const Header = ({ type, title }) => (
  <section className="pregunta-header">
    <section className="subtitulo-container">
      <p className="pregunta-subtitulo">{type}</p>
    </section>
    <h2 className="pregunta-titulo">{title}</h2>
  </section>
);

export default Header;
