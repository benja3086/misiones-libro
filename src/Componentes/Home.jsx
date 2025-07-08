import { Link } from "react-router-dom";
import "./Productos.css";
import Productos from "./Productos"; 

const Home = () => {
  return (
    <div>
      <nav className="menu">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/Contacto">Contacto</Link>
        <Link to="/Libros">Libros</Link>
      </nav>
    </div>
  );
};
export default Home;
