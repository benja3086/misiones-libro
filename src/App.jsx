import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./Index.css";
import Home from "./Home";
import Libros from "./Componentes/Libros";
import LibroDetalle from "./Componentes/LibroDetalle";

const App = () => {
 return (
    <Routes>
      <Route path="/" element={<Libros />} />
      <Route path="/libros/:id" element={<LibroDetalle />} />  
    </Routes>
  );
};
  export default App;