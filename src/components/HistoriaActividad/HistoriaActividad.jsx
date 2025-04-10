import { useEffect, useState } from 'react'; 
import historias from '../../data/historias.json'; 
import Header from '../Header/Header'; 
import BotonSiguiente from '../BotonSiguiente/BotonSiguiente'; 
import './HistoriaActividad.css'; 


const imagenes = import.meta.glob('../../assets/images/*.png', { eager: true });

// Esta función busca la imagen por su nombre en la carpeta
function getImage(nombre) {
  const path = `../../assets/images/${nombre}`;
  return imagenes[path]?.default || null; 
}

// Componente principal
function HistoriaActividad({ onFinish }) {
  const [historia, setHistoria] = useState(null);
  // Estado para saber en qué página de la historia estamos
  const [paginaActual, setPaginaActual] = useState(0);

  // Cuando se monta el componente, elige una historia al azar y empieza desde la página 0
  useEffect(() => {
    const aleatoria = historias[Math.floor(Math.random() * historias.length)];
    setHistoria(aleatoria);
    setPaginaActual(0);
  }, []);

  // Esta función se ejecuta cuando se hace clic en el botón
  function handleSiguiente() {
    if (!historia) return; // Si no hay historia aún, no hace nada

    // Verifica si estamos en la última página
    const ultimaPagina = paginaActual === historia.pages.length - 1;

    if (ultimaPagina) {
      // Si ya terminamos, se llama a la función que nos pasa el componente padre
      if (onFinish) onFinish();
    } else {
      // Si no es la última, pasamos a la siguiente página
      setPaginaActual(paginaActual + 1);
    }
  }

  // Mientras no se haya cargado la historia, mostramos un texto
  if (!historia) return <p>Cargando historia...</p>;

  // Guardamos la página actual en una variable para usarla en el render
  const pagina = historia.pages[paginaActual];
  const imagenSrc = getImage(pagina.image); // Buscamos la imagen correspondiente
  const esUltima = paginaActual === historia.pages.length - 1; // Checamos si es la última página

  // Aquí empieza el diseño que se ve en la pantalla
  return (
    <div className="historia-container">
      <Header tipo="historia" titulo="Read the text" /> {/* Usamos el header con título */}
      <div className="historia-content">
        <h2 className="historia-title">{historia.title}</h2> {/* Título de la historia */}

        {/* Mostramos la imagen si existe */}
        {imagenSrc && (
          <img
            src={imagenSrc}
            alt="Imagen de historia"
            className="historia-imagen"
          />
        )}

        {/* Mostramos el texto de la historia */}
        <p className="historia-texto">{pagina.text}</p>

        {/* Botón para seguir con la historia o terminarla */}
        <BotonSiguiente
          onClick={handleSiguiente}
          disabled={false}
          label={esUltima ? 'Test completed' : 'Continuar'}
        />
      </div>
    </div>
  );
}

export default HistoriaActividad; // Exportamos el componente para usarlo en otras partes


