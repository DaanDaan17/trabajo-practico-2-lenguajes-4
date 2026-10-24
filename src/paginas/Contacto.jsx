
import FormularioContacto from "../components/FormularioContacto";

function Contacto() {
  return (
    <section className="pagina-contacto">
      <div className="encabezado-pagina">
        <p className="etiqueta">ESTAMOS PARA AYUDARTE</p>
        <h1>Contacto</h1>
        <p>
          Escribinos mediante el formulario o consultá nuestra
          ubicación en el mapa.
        </p>
      </div>

      <div className="contacto-layout">
        <div className="columna-formulario">
          <FormularioContacto />
        </div>

        <section className="mapa-contenedor">
          <h2>Nuestra ubicación</h2>

          <p>
            Plaza 9 de Julio, Salta, Argentina.
          </p>

          <iframe
            title="Mapa de Plaza 9 de Julio en Salta"
            src="https://www.google.com/maps?q=Plaza%209%20de%20Julio%2C%20Salta%2C%20Argentina&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <a
            className="enlace-mapa"
            href="https://www.google.com/maps/search/?api=1&query=Plaza+9+de+Julio+Salta+Argentina"
            target="_blank"
            rel="noreferrer"
          >
            Abrir en Google Maps
          </a>
        </section>
      </div>
    </section>
  );
}

export default Contacto;
