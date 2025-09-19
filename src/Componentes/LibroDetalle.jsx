import { useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import "./LibroDetalle.css";
import BotonPago from "./BotonPago";
import data from "./Libros.json"; 

const LibroDetalle = () => {
  const { id } = useParams();

  const libro = data.producto.find((l) => l.id === parseInt(id));

  const [imagenGrande, setImagenGrande] = useState(null);
  const [zoom, setZoom] = useState(1);
  const modalRef = useRef(null);

  useEffect(() => {
    if (imagenGrande && modalRef.current) {
      modalRef.current.scrollTop = 0;
      modalRef.current.scrollLeft = 0;
    }
  }, [imagenGrande]);

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
        <p className="autor">Autor: {libro.autor || "Desconocido"}</p>
        <p className="precio">${libro.precio}</p>
        <p>{libro.descripcion}</p>
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
