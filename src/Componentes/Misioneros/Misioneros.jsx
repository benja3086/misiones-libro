import React from "react";
import { useParams } from "react-router-dom";
import "./Misioneros.css";
import imagen1 from "../../../public/imagenes/martita.jpg";
import imagen2 from "../../../public/imagenes/familiarinaldi.jpg";
import imagen3 from "../../../public/imagenes/elviracorbalan.jpg";

const datosMisioneros = {
  familiarinaldi: {
    titulo: "Familia Rinaldi",
    descripcion:
      "SU HISTORIA:\n Sirven desde el año 2012 en Amaicha del Valle.\n Actualmente viven allí y están dando a conocer a Jesús en los Valles Calchaquíes\n a través de relaciones intencionales con las personas.\n Por la gracia de Dios, ya existe una comunidad firme de hermanos en crecimiento, siendo transformados por Jesús. \n¿CÓMO ORAR?\n Por el pueblo de Amaicha y alrededores, por cada habitante que llegue al conocimiento de la verdad y Cristo sea revelado en sus vidas. Por los hermanos de la Iglesia en Amaicha, Dios permita permanecer en Él siendo de fiel testimonio. Por la familia Rinaldi, que Dios sea siempre su guía constante y puedan escuchar su voz.",
    imagen: "/imagenes/familiarinaldi.jpg",
  },
  martitadeteri: {
    titulo: "Martita De Teri",
    descripcion:
      "MISIONERA EN COLONIA CAROYA - CÓRDOBA\n Fué encomendada como misionera junto a su esposo Carlos (ya con el Señor) hace más de 50 años. Sirviendo en Tinogasta, Pilar, y luego, en Colonia Caroya, donde fundaron la iglesia hace más de 35 años. Actualmente, escribe para la revista Joyas Escogidas, colabora con el ministerio femenino y otras actividades eclesiásticas. \nOREMOS POR:\n SU SALUD, YA QUE ES DIABETICA Y SUFRE PROBLEMAS DE PRESIÓN. POR SU FAMILIA PROVISIÓN DE DIOS PARA CADA UNA DE SUS NECESIDADES. PARA QUE PUEDA SER UN REFLEJO DEL AMOR DE DIOS EN EL GRUPO LITERARIO EN EL QUE PARTICIPA",
    imagen: "/imagenes/martita.jpg",
  },
  elviracorbalan: {
    titulo: "Elvira Corbalán",
    descripcion:
      "En el año 2008, fue llamada a servir entre los Sos Kundi, pertenecientes a Papúa Nueva Guinea.\n Actualmente es Asesora de Traducción y Alfabetización, entre los Sos Kundi. Es profesora de Panorama Bíblico y Antiguo Testamento en el Centro de Entrenamiento de SIL",
    imagen: "/imagenes/elviracorbalan.jpg",
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
      <div className="misionero-texto">
        <h1 className="misionero-titulo">{datos.titulo}</h1>
        <p className="misionero-descripcion">{datos.descripcion}</p>
      </div>

      {datos.imagen && (
        <img
          src={datos.imagen}
          alt={datos.titulo}
          className="misionero-imagen"
        />
      )}
    </div>
  );
};

export default Misioneros;
