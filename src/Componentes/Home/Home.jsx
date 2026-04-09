import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const columnasCategorias = [
  [
    { nombre: "Libros", enlace: "/producto/libros" },
    { nombre: "Remeras", enlace: "/producto/remeras" },
  ],
  [
    { nombre: "Utiles", enlace: "/producto/utiles" },
    { nombre: "Ver mas...", enlace: "/producto" },
  ],
];

const columnasMisioneros = [
  [
    { nombre: "Familia Rinaldi", enlace: "/misioneros/familiarinaldi" },
    { nombre: "Martita De Teri", enlace: "/misioneros/martitadeteri" },
    { nombre: "Elvira Corbalan", enlace: "/misioneros/elviracorbalan" },
  ],
];

const Home = () => {
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const [mostrarMisioneros, setMostrarMisioneros] = useState(false);

 return (
    <div className="navbar">
      <ul className="menu">
        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li
          onMouseEnter={() => setMostrarProductos(true)}
          onMouseLeave={() => setMostrarProductos(false)}
        >
          <Link to="/producto">Productos</Link>
          {mostrarProductos && (
            <div className="mega-menu">
              {columnasCategorias.map((columna, idx) => (
                <div key={idx}>
                  {columna.map((item) => (
                    <div key={item.nombre} style={{ margin: "8px 0" }}>
                      <Link to={item.enlace}>{item.nombre}</Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </li>

        <li
          onMouseEnter={() => setMostrarMisioneros(true)}
          onMouseLeave={() => setMostrarMisioneros(false)}
        >
          <Link to="/misioneros">Misioneros</Link>
          {mostrarMisioneros && (
            <div className="mega-menu">
              {columnasMisioneros.map((columna, idx) => (
                <div key={idx}>
                  {columna.map((item) => (
                    <div key={item.nombre} style={{ margin: "8px 0" }}>
                      <Link to={item.enlace}>{item.nombre}</Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </li>

        {/* ← adentro del ul */}
        <li>
          <Link to="/login">Iniciar sesión</Link>
        </li>

      </ul>
    </div>
  );
};

export default Home;
