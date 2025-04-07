import { useEffect, useState } from 'react';
import historias from '../../data/historias.json';
import Header from '../Header/Header';
import BotonSiguiente from '../BotonSiguiente/BotonSiguiente';
import './HistoriaActividad.css';

// Cargar imágenes desde assets
const imagenes = import.meta.glob('../../assets/images/*.png', { eager: true });

function getImage(nombre) {
  const path = `../../assets/images/${nombre}`;
  return imagenes[path]?.default || null; // Retorna null si no existe
}

function HistoriaActividad({ onFinish }) {
  const [historia, setHistoria] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    const aleatoria = historias[Math.floor(Math.random() * historias.length)];
    setHistoria(aleatoria);
    setPaginaActual(0);
  }, []);

  function handleSiguiente() {
    if (!historia) return;

    const ultimaPagina = paginaActual === historia.pages.length - 1;

    if (ultimaPagina) {
      if (onFinish) onFinish();
    } else {
      setPaginaActual(paginaActual + 1);
    }
  }

  if (!historia) return <p>Cargando historia...</p>;

  const pagina = historia.pages[paginaActual];
  const imagenSrc = getImage(pagina.image);
  const esUltima = paginaActual === historia.pages.length - 1;

  return (
    <div className="historia-container">
      <Header tipo="historia" titulo="Read the text" />
      <div className="historia-content">
        <h2 className="historia-title">{historia.title}</h2>

        {imagenSrc && (
          <img
            src={imagenSrc}
            alt="Imagen de historia"
            className="historia-imagen"
          />
        )}

        <p className="historia-texto">{pagina.text}</p>

        <BotonSiguiente
          onClick={handleSiguiente}
          disabled={false}
          label={esUltima ? 'Test completed' : 'Next'}
        />
      </div>
    </div>
  );
}

export default HistoriaActividad;

