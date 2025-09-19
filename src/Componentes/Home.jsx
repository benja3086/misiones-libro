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

const Home = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (
    <div>
      <div className="navbar">
        <ul className="menu">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li
            onMouseEnter={() => setMostrarMenu(true)}
            onMouseLeave={() => setMostrarMenu(false)}
          >
            <Link to="/Producto">Productos</Link>
            {mostrarMenu && (
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

          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
