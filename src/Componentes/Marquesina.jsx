import React from "react";
import "./Marquesina.css";

const Marquesina = () => {
  const texto = "Hasta en lo ultimo de la tierra ㅤㅤㅤㅤ  ";

  return (
    <div className="marquesina">
      <div className="marquesina-inner">
        <div className="track">
          <span>{texto.repeat(30)}</span>
          <span>{texto.repeat(30)}</span> {/* 2 copias seguidas */}
        </div>
      </div>
    </div>
  );
};

export default Marquesina;
