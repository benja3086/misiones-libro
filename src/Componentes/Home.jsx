import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const categorias = [
  {
    titulo: "",
    items: [
      { nombre: "Libros", enlace: "/producto/libros" },
      { nombre: "Utiles", enlace: "/producto/utiles" },
      { nombre: "Cuadernos", enlace: "/producto/cuadernos" },
       { nombre: "Accesorios", enlace: "/producto/accesorios" },
       { nombre: "Remeras", enlace: "/producto/remeras" },
    ],
  },
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
            <Link to="/Producto">
              {" "}
              <span className="menu-link">Producto</span>
            </Link>
            {mostrarMenu && (
              <div className="mega-menu">
                {categorias.map((cat) => (
                  <div className="columna" key={cat.titulo}>
                    <h3>{cat.titulo}</h3>
                    <ul>
                      {cat.items.map((item) => (
                        <li key={item.nombre}>
                          <Link to={item.enlace}>{item.nombre}</Link>
                        </li>
                      ))}
                    </ul>
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
