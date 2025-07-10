import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Libros from "./Componentes/Libros";
import LibroDetalle from "./Componentes/LibroDetalle";
import Marquesina from "./Componentes/Marquesina";
import Productos from "./Componentes/Productos";
import Contacto from "./Componentes/Contacto";
import Home from "./Componentes/Home";
import BotonIg from "./Componentes/BotonIg";

const App = () => {
  return (
    <div>
      <Marquesina />
      <Home/>
      <BotonIg/>
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/Libros" element={<Libros />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        
      </Routes>
    </div>
  );
};
export default App;
