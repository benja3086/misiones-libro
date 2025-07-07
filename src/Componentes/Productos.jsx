import { Link } from "react-router-dom";
import "./Productos.css";
import imagen from "../assets/fondo-blanco.png";
import imagen1 from "../assets/Logo-verde.png";

const Productos = () => {
  return (
    <div className="productos-container">
      <img className="logo3" src={imagen1} alt="Logo de misiones" />

      <div className="productos-texto">
        <p>
          Somos el <strong>Ministerio de Misiones</strong> de Iglesia de Cristo Pje Padilla.
        </p>
        <p>
          Trabajamos para ver una iglesia comprometida en obedecer el llamado de Jesús
          de hacer discípulos hasta lo último de la tierra.
        </p>
        <p>
          Además, nos enfocamos en el cuidado integral de nuestros misioneros en el campo
          y acompañamos a los candidatos en su proceso de preparación.
        </p>
        <p>
          Las finanzas son un área clave para desarrollar el plan de Dios y sostener
          a nuestros misioneros. Por eso, creamos esta tienda: <strong>cada compra apoya
          directamente a los misioneros y candidatos de nuestra iglesia local.</strong>
        </p>
        <h2>¡Gracias por ser parte!</h2>
      </div>
    </div>
  );
};

export default Productos;

