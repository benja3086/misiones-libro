import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ReactGA from "react-ga4";

import "./index.css";
import LibroDetalle from "./Componentes/LibroDetalle/LibroDetalle";
import Marquesina from "./Componentes/Marquesina/Marquesina";
import Inicio from "./Componentes/Inicio/Inicio";
import Contacto from "./Componentes/Contacto/Contacto";
import Home from "./Componentes/Home/Home";
import BotonIg from "./Componentes/BotonIg/BotonIg";
import Producto from "./Componentes/Producto/Producto";
import Misioneros from "./Componentes/Misioneros/Misioneros";
import Login from "./Componentes/Login/Login";
import Admin from "./Componentes/Admin/Admin";
import { useAuth } from "./Context/AuthContext";

ReactGA.initialize("G-PE39GW4037");

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  const location = useLocation();
  const ocultarBotonIg = location.pathname.startsWith("/admin");
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <div>
      <Marquesina />
      <Home />
      {!ocultarBotonIg && <BotonIg />}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/producto/:categoria?" element={<Producto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/misioneros" element={<Misioneros />} />
        <Route path="/misioneros/:nombre" element={<Misioneros />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;