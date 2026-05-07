import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [menuMobileAbierto, setMenuMobileAbierto] = useState(false);

  const location = useLocation();

  const cerrarMenuMobile = () => {
    setMenuMobileAbierto(false);
  };

  const esRutaActiva = (ruta) =>
    ruta === "/"
      ? location.pathname === ruta
      : location.pathname.startsWith(ruta);

  useEffect(() => {
    setMenuMobileAbierto(false);
    setMostrarProductos(false);
    setMostrarMisioneros(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle(
      "body-menu-mobile-abierto",
      menuMobileAbierto
    );

    return () => {
      document.body.classList.remove("body-menu-mobile-abierto");
    };
  }, [menuMobileAbierto]);

  return (
    <header className="home-navbar">
      <Link className="home-brand" to="/" onClick={cerrarMenuMobile}>
        Misiones
      </Link>

      <button
        className="home-menu-toggle"
        type="button"
        aria-label={menuMobileAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-controls="home-navigation"
        aria-expanded={menuMobileAbierto}
        onClick={() => setMenuMobileAbierto((abierto) => !abierto)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="home-navigation"
        className={`home-nav ${
          menuMobileAbierto ? "home-nav--abierto" : ""
        }`}
        aria-label="Navegación principal"
      >
        <div className="home-nav-header-mobile">
          <span>Menú</span>

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={cerrarMenuMobile}
          >
            ×
          </button>
        </div>

        <ul className="home-menu">
          {/* ── INICIO ── */}
          <li>
            <Link
              className={esRutaActiva("/") ? "home-link-activo" : undefined}
              to="/"
              onClick={cerrarMenuMobile}
            >
              Inicio
            </Link>
          </li>

          {/* ── PRODUCTOS ── */}
          <li className="home-menu-item-con-submenu">
            <Link
              className={
                esRutaActiva("/producto")
                  ? "home-link-activo"
                  : undefined
              }
              to="/producto"
              onClick={cerrarMenuMobile}
            >
              Productos
            </Link>

            <button
              className="home-submenu-toggle"
              type="button"
              aria-expanded={mostrarProductos}
              onClick={() =>
                setMostrarProductos((mostrar) => !mostrar)
              }
            >
              Categorías
            </button>

            {mostrarProductos && (
              <div className="home-mega-menu">
                {columnasCategorias.map((columna, idx) => (
                  <div className="home-mega-columna" key={idx}>
                    {columna.map((item) => (
                      <Link
                        key={item.nombre}
                        to={item.enlace}
                        onClick={cerrarMenuMobile}
                      >
                        {item.nombre}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </li>

          {/* ── MISIONEROS ── */}
          <li className="home-menu-item-con-submenu">
            <Link
              className={
                esRutaActiva("/misioneros")
                  ? "home-link-activo"
                  : undefined
              }
              to="/misioneros"
              onClick={cerrarMenuMobile}
            >
              Misioneros
            </Link>

            <button
              className="home-submenu-toggle"
              type="button"
              aria-expanded={mostrarMisioneros}
              onClick={() =>
                setMostrarMisioneros((mostrar) => !mostrar)
              }
            >
              Ver misioneros
            </button>

            {mostrarMisioneros && (
              <div className="home-mega-menu">
                {columnasMisioneros.map((columna, idx) => (
                  <div className="home-mega-columna" key={idx}>
                    {columna.map((item) => (
                      <Link
                        key={item.nombre}
                        to={item.enlace}
                        onClick={cerrarMenuMobile}
                      >
                        {item.nombre}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </li>

          {/* ── LOGIN ── */}
          <li>
            <Link
              className={
                esRutaActiva("/login")
                  ? "home-link-activo"
                  : undefined
              }
              to="/login"
              onClick={cerrarMenuMobile}
            >
              Iniciar sesión
            </Link>
          </li>
        </ul>
      </nav>

      {menuMobileAbierto && (
        <button
          className="home-nav-overlay"
          type="button"
          aria-label="Cerrar menú"
          onClick={cerrarMenuMobile}
        />
      )}
    </header>
  );
};

export default Home;