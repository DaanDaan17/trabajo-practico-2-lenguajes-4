
const servicios = [
  {
    id: 1,
    nombre: "Desarrollo web",
    descripcion:
      "Creación de sitios web modernos, adaptables a celulares y computadoras.",
    imagen:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    categoria: "Software",
  },
  {
    id: 2,
    nombre: "Mantenimiento de computadoras",
    descripcion:
      "Diagnóstico de problemas, limpieza, optimización y mantenimiento preventivo.",
    imagen:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80",
    categoria: "Hardware",
  },
  {
    id: 3,
    nombre: "Redes informáticas",
    descripcion:
      "Configuración de redes, conexión de dispositivos y resolución de problemas de conectividad.",
    imagen:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    categoria: "Conectividad",
  },
  {
    id: 4,
    nombre: "Soporte técnico",
    descripcion:
      "Asistencia para resolver errores de software, instalaciones y configuración de equipos.",
    imagen:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    categoria: "Asistencia",
  },
];

function Servicios() {
  return (
    <section className="pagina-servicios">
      <div className="encabezado-pagina">
        <p className="etiqueta">SOLUCIONES DIGITALES</p>
        <h1>Nuestros servicios</h1>
        <p>
          Soluciones tecnológicas para mejorar tu experiencia
          con la informática.
        </p>
      </div>

      <div className="grilla-servicios">
        {servicios.map((servicio) => (
          <article className="tarjeta-servicio" key={servicio.id}>
            <img
              src={servicio.imagen}
              alt={servicio.nombre}
              loading="lazy"
            />

            <div className="contenido-tarjeta">
              <span className="categoria-servicio">
                {servicio.categoria}
              </span>

              <h2>{servicio.nombre}</h2>

              <p>{servicio.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Servicios;
