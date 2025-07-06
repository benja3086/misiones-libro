import React from "react";
import "./Marquesina.css";

const Marquesina = () => {
  const texto = "Hasta en lo último de la tierra ㅤㅤㅤㅤ ";

  return (
    <div className="marquesina">
      <div className="marquesina-contenido">
        <span>{texto.repeat(8)}</span>
      </div>
    </div>
  );
};

export default Marquesina;
