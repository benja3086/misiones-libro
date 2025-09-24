import React from "react";
import { useParams } from "react-router-dom";
import "./Misioneros.css";

const datosMisioneros = {
  familiarinaldi: {
    titulo: "Familia Rinaldi",
    descripcion: "Su Historia\n Sirven desde el año 2012 en Amaicha del Valle, Tucumán.\nActualmente viven alli y estan dando a conocer a\n Jesus en los Valles Calchaquies a traves de\n relaciones intencionales con las personas\n Por la gracia de Dios ya existe una comunidad\nfirme de hermanos en crecimiento, siendo \n transformados por Jesus \n¿como orar? Por el pueblo de Amaicha y alrededores, por cada\n habitante que llegue al conocimiento de la verdad\n y Cristo sea revelado en sus vidas.\n Por los hermanos de la iglesia en Amaicha,Dios\n permita permanecer en El siendo de fiel testimonio.\n Por la familia Rinaldi, que Dios sea siempre su\n guia constante y puedan escuchar su voz ",
  },
  martitadeteri: {
    titulo: "Martita De Teri",
    descripcion: "Misionera en colonia Caroya - Cordoba\n \n Fue encomendada como miisionera junto a su esposo Carlos (ya con el Señor) hace mas de 50 años.\n Sirviendo en Tinogasta, Pilar, y luego, en Colonia Caroya, donde fundadorn la iglesia hace mas de 35 años. Actualmente, escribe para la revista Joyas Escogidas, colabora con el ministerio femenino y otras actividades eclesiaticas\n\n OREMOS POR:\n\n Su salud, ya que es diabetica y sufre problemas de presion por su familia\n Provision de Dios para cada una de sus necesidades.\n Para que pueda ser un reflejo del amor de Dios en el grupo literario en el que participa",
  },
   elviracorbalan: {
    titulo: "Elvira Corbalan",
    descripcion: "En el 2008, fue llamada a servir entre\n los Sos Kundi, pertenecientes a Papua Nueva Guinea.\n\n Actualmente es Asesora de Traduccion\n y Alfabetizacion, entre los Sos Kundi.\n Es profesora de Panorama Biblico y AT en el Centro de Entrenamiento de SIL",
  },
};

const Misioneros = () => {
  const { nombre } = useParams();
  const datos = datosMisioneros[nombre];

  if (!datos) {
    return (
      <h1 className="misionero-error">
        No se encontró información de este misionero.
      </h1>
    );
  }

  return (
    <div className="misionero-container">
      <h1 className="misionero-titulo">{datos.titulo}</h1>
      <p className="misionero-descripcion">{datos.descripcion}</p>
    </div>
  );
};

export default Misioneros;
