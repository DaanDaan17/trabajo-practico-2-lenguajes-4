import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function FormularioContacto() {
  const form = useRef();

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const validarFormulario = () => {
    const formData = new FormData(form.current);

    const nombre = formData.get("nombre").trim();
    const email = formData.get("email").trim();
    const mensaje = formData.get("mensaje").trim();

    const nuevosErrores = {};

    // Validación del nombre
    if (nombre === "") {
      nuevosErrores.nombre = "El nombre y apellido es obligatorio.";
    } else if (nombre.length < 3) {
      nuevosErrores.nombre =
        "El nombre y apellido debe tener al menos 3 caracteres.";
    }

    // Validación del correo
    if (email === "") {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email =
        "Ingresá un correo electrónico válido. Ejemplo: nombre@gmail.com";
    }

    // Validación del mensaje
    if (mensaje === "") {
      nuevosErrores.mensaje = "El mensaje es obligatorio.";
    } else if (mensaje.length > 300) {
      nuevosErrores.mensaje =
        "El mensaje no puede superar los 300 caracteres.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    setEnviado(false);

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    emailjs
      .sendForm(
        "service_fgr2svp",
        "template_xwr4jsc",
        form.current,
        {
          publicKey: "enCNqET487eTGuM8m",
        }
      )
      .then(() => {
        setEnviado(true);
        setEnviando(false);

        form.current.reset();
        setErrores({});
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
         setEnviando(false);
        alert("Error de EmailJS: " + error.text);
        });
  };

  return (
    <div className="formulario-contenedor">

      <h2>Formulario de Contacto</h2>

      <form ref={form} onSubmit={enviarFormulario}>

        <div className="campo">
          <label htmlFor="nombre">
            Nombre y Apellido
          </label>

          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ej: Abel Pintos"
          />

          {errores.nombre && (
            <p className="error">{errores.nombre}</p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="email">
            Correo Electrónico
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ej: juan@gmail.com"
          />

          {errores.email && (
            <p className="error">{errores.email}</p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="mensaje">
            Mensaje
          </label>

          <textarea
            id="mensaje"
            name="mensaje"
            maxLength="300"
            rows="6"
            placeholder="Escribí tu mensaje..."
          ></textarea>

          <p className="contador">
            Máximo 300 caracteres
          </p>

          {errores.mensaje && (
            <p className="error">{errores.mensaje}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>

        {enviado && (
          <p className="exito">
            ¡Mensaje enviado correctamente!
          </p>
        )}

      </form>
    </div>
  );
}

export default FormularioContacto;