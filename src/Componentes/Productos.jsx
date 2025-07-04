import { Link } from "react-router-dom";
import "./Productos.css";
import Contacto from "./Contacto";
const Productos = () => {
  return (
    <div>
      <nav className="menu">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/Contacto">Contacto</Link>
        <Link to="/Libros">libros</Link>
      </nav>
      <h3>Somos el Ministerio de Misiones de Iglesia de Cristo Pje Padilla. 

Trabajamos para ver una iglesia comprometida en obedecer el
llamado de Jesus de hacer discipulos hasta lo último de la tierra.
Además, nos enfocamos en el cuidado integral de nuestros misioneros
en el campo y acompañamos a los candidatos en su proceso de preparación.

Las finanzas son un área clave para desarrollar el plan de Dios y sostener a nuestros misioneros. Es por eso que hemos diseñado nuestra tienda. Con la compra de cualquier producto estas apoyando directamente a los misioneros y candidatos de nuestra iglesia local. 

<h2><p>¡Gracias por ser parte!</p></h2></h3>
    </div>
  );
};
export default Productos;
