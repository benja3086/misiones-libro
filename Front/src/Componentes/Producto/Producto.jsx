import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import imagen from "../../assets/fondo-blanco.png";
import "./Producto.css";

const API =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://misiones-libro-production.up.railway.app");

const Items = () => {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const { categoria } = useParams();

  const categoriaSeleccionada = categoria?.toLowerCase() || null;

  // 🔥 Traer productos del backend
  useEffect(() => {
    fetch(`${API}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al traer productos:", err));
  }, []);

  // 🔍 Filtrar productos
  const resultados = productos.filter((item) => {
    const coincideCategoria =
      !categoriaSeleccionada ||
      item.categoria?.toLowerCase() === categoriaSeleccionada;

    const coincideBusqueda =
      item.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.id?.toString().includes(busqueda);

    return coincideCategoria && coincideBusqueda;
  });

  // ⏳ Loading
  if (!productos.length) return <h2>Cargando productos...</h2>;

  return (
    <>
      <header className="home-header">
        <img alt="" className="home-logo" />
        <h1 className="titulo">Tienda Misiones</h1>
      </header>

      <div className="buscador-contenedor">
        <input
          type="text"
          placeholder="Busca por nombre ..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        <button className="boton-lupa" type="submit">
          <svg
            className="icono-lupa"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="contenedor-libros">
        {resultados.map((producto) => (
          <Link
            to={`/libros/${producto.id}`}
            key={producto.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="tarjeta-libro">
              {producto.imagen &&
                (Array.isArray(producto.imagen) ? (
                  <img src={producto.imagen[0]} alt={producto.nombre} />
                ) : (
                  <img src={producto.imagen} alt={producto.nombre} />
                ))}

              <h3 className="titulo-libro">
                {producto.nombre?.trim()}
              </h3>

              <p className="precio">
                ${producto.precio?.toLocaleString("es-AR")}
              </p>

              {producto.stock === 0 && (
                <p className="sin-stock">Sin stock</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <img className="logo" src={imagen} alt="Logo de misiones" />
    </>
  );
};

export default Items;