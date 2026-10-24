
import { useEffect, useState } from "react";

const IMAGEN_PREDETERMINADA =
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=80";

function Inicio() {
  const [lanzamientos, setLanzamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarLanzamientos() {
      try {
        const respuesta = await fetch(
          "https://gateway.pipeworx.io/spacex/v4/launches/past?limit=6"
        );

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // La API debería devolver una lista de lanzamientos.
        const lista = Array.isArray(datos)
          ? datos
          : datos.results || datos.launches || datos.data || [];

        if (!Array.isArray(lista)) {
          throw new Error("El formato de respuesta no es válido.");
        }

        setLanzamientos(lista);
      } catch (err) {
        console.error("Error al consultar la API:", err);
        setError(
          "No pudimos cargar los lanzamientos. Intentá nuevamente más tarde."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarLanzamientos();
  }, []);

  function fechaLegible(lanzamiento) {
    const fecha =
      lanzamiento.date_utc ||
      lanzamiento.date ||
      lanzamiento.net;

    if (!fecha) return "No disponible";

    const fechaConvertida = new Date(fecha);

    if (Number.isNaN(fechaConvertida.getTime())) {
      return String(fecha);
    }

    return fechaConvertida.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function resultadoLegible(lanzamiento) {
    const resultado =
      lanzamiento.success ?? lanzamiento.status;

    if (resultado === true) return "Exitoso";
    if (resultado === false) return "Fallido";
    if (typeof resultado === "string") return resultado;

    return "Sin información";
  }

  function imagenLegible(lanzamiento) {
    return (
      lanzamiento.image ||
      lanzamiento.image_url ||
      lanzamiento.links?.patch?.large ||
      lanzamiento.links?.patch?.small ||
      lanzamiento.links?.flickr?.original?.[0] ||
      lanzamiento.rocket_image ||
      IMAGEN_PREDETERMINADA
    );
  }

  return (
    <section className="pagina-inicio">
      <div className="portada">
        <p className="etiqueta">TECNOLOGÍA · CIENCIA · INNOVACIÓN</p>

        <h1>Explorá el futuro</h1>

        <p className="portada-descripcion">
          Conocé los lanzamientos espaciales y descubrí los avances
          de la exploración espacial mediante una API pública.
        </p>

        <a href="#lanzamientos" className="boton-portada">
          Ver lanzamientos
        </a>
      </div>

      <section id="lanzamientos" className="seccion-lanzamientos">
        <h2>Lanzamientos espaciales</h2>

        <p className="texto-seccion">
          Datos obtenidos de la API pública de Pipeworx.
        </p>

        {cargando && <p>Cargando lanzamientos...</p>}

        {error && <p className="mensaje-error">{error}</p>}

        {!cargando && !error && lanzamientos.length === 0 && (
          <p>La API no devolvió lanzamientos.</p>
        )}

        <div className="grilla-lanzamientos">
          {lanzamientos.map((lanzamiento, indice) => (
            <article
              className="tarjeta-lanzamiento"
              key={lanzamiento.id || lanzamiento.name || indice}
            >
              <img
                src={imagenLegible(lanzamiento)}
                alt={`Imagen del lanzamiento ${lanzamiento.name || "espacial"}`}
                loading="lazy"
                onError={(evento) => {
                  evento.currentTarget.onerror = null;
                  evento.currentTarget.src = IMAGEN_PREDETERMINADA;
                }}
              />

              <div className="contenido-tarjeta">
                <h3>
                  {lanzamiento.name || "Lanzamiento espacial"}
                </h3>

                <p>
                  <strong>Fecha:</strong> {fechaLegible(lanzamiento)}
                </p>

                <p>
                  <strong>Cohete:</strong>{" "}
                  {lanzamiento.rocket?.name ||
                    lanzamiento.rocket ||
                    "No disponible"}
                </p>

                <p>
                  <strong>Resultado:</strong>{" "}
                  {resultadoLegible(lanzamiento)}
                </p>

                <p>
                  <strong>Detalles:</strong>{" "}
                  {lanzamiento.details ||
                    lanzamiento.mission ||
                    "No hay detalles disponibles."}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="fuente-api">
          Fuente:{" "}
          <a
            href="https://pipeworx.io/blog/spacex-api-revived/"
            target="_blank"
            rel="noreferrer"
          >
            Pipeworx — API de lanzamientos
          </a>
        </p>
      </section>
    </section>
  );
}

export default Inicio;