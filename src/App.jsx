// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import "./index.css";
import LibroDetalle from "./Componentes/LibroDetalle/LibroDetalle";
import Marquesina from "./Componentes/Marquesina/Marquesina";
import Inicio from "./Componentes/Inicio/Inicio";
import Contacto from "./Componentes/Contacto/Contacto";
import Home from "./Componentes/Home/Home";
import BotonIg from "./Componentes/BotonIg/BotonIg";
import Producto from "./Componentes/Producto/Producto";
import BotonPago from "./Componentes/BotonPago";

ReactGA.initialize("G-PE39GW4037"); 
const App = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <div>
      <Marquesina />
      <Home />
      <BotonIg />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/producto/:categoria?" element={<Producto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
      </Routes>
      

    </div>
  );
};

export default App;
