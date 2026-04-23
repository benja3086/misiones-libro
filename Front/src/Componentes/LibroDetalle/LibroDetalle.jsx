import { useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import "./LibroDetalle.css";
//import BotonPago from "../BotonPago";

const LibroDetalle = () => {
  const { id } = useParams();

  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [imagenGrande, setImagenGrande] = useState(null);
  const [zoom, setZoom] = useState(1);
  const modalRef = useRef(null);
  const [libro, setLibro] = useState(null);
 const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    setError("");
    fetch(`${API}/productos/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo cargar el libro");
        return res.json();
      })
      .then((data) => setLibro(data))
      .catch((err) => {
        console.error(err);
        setLibro(null);
        setError("No se pudo cargar el detalle del libro");
      })
      .finally(() => setCargando(false));
  }, [API, id]);

  useEffect(() => {
    if (imagenGrande && modalRef.current) {
      modalRef.current.scrollTop = 0;
      modalRef.current.scrollLeft = 0;
    }
}, [imagenGrande]);

if (cargando) return <h2>Cargando libro...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!libro) return <h2>Libro no encontrado</h2>;

  const imagenes = Array.isArray(libro.imagen)
    ? libro.imagen
    : libro.imagen
    ? [libro.imagen]
    : [];

  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((z) => {
      let nuevoZoom = z + (e.deltaY < 0 ? 0.2 : -0.2);
      if (nuevoZoom < 1) nuevoZoom = 1;
      if (nuevoZoom > 5) nuevoZoom = 5;
      return nuevoZoom;
    });
  };

  return (
    <div className="detalle-libro">
      <div className="galeria-imagenes">
        {imagenes.length > 0 ? (
          imagenes.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${libro.nombre} ${index + 1}`}
              onClick={() => setImagenGrande(img)}
              style={{ cursor: "pointer" }}
            />
          ))
        ) : (
          <p>Sin imágenes disponibles</p>
        )}
      </div>

      <div className="detalle-libro-contenido">
        <h2>{libro.nombre}</h2>
        <p className="precio">${libro.precio}</p>
        <p>{libro.descripcion}</p>
       { /*<BotonPago
          className="boton-pago-personalizado"
          titulo={libro.nombre}
          precio={libro.precio}
          cantidad={1}
        />*/}
      </div>

      {imagenGrande && (
        <div
          className="modal-imagen"
          ref={modalRef}
          style={{
            cursor: zoom > 1 ? "grab" : "zoom-in",
          }}
          onClick={() => {
            setImagenGrande(null);
            setZoom(1);
          }}
        >
          <img
            src={imagenGrande}
            alt="Vista grande"
            style={{
              cursor: zoom > 1 ? "grab" : "zoom-in",
              transform: `scale(${zoom})`,
              transition: "transform 0.3s",
            }}
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default LibroDetalle;
