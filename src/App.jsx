// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

import Libros from "./Componentes/Libros";
import LibroDetalle from "./Componentes/LibroDetalle";
import Marquesina from "./Componentes/Marquesina";
import Inicio from "./Componentes/Inicio";
import Contacto from "./Componentes/Contacto";
import Home from "./Componentes/Home";
import BotonIg from "./Componentes/BotonIg";
import Producto from "./Componentes/Producto";

const App = () => {
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
