
import './Header.css';

const Header = ({ tipo, titulo }) => (
  <section className="pregunta-header">
    <section className="subtitulo-container">
      <p className="pregunta-subtitulo">{tipo}</p>
    </section>
    <h2 className="pregunta-titulo">{titulo}</h2>
  </section>
);

export default Header;
