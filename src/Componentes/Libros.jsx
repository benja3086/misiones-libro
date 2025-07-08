import React, { useState } from "react";
import { Link } from "react-router-dom";
import imagen from "../assets/fondo-blanco.png";

const Libros = () => {
  const [busqueda, setBusqueda] = useState("");

  const [items] = useState([
    {
      className: "tarjeta-libro",
      id: 1,
      nombre: "Sirviendo Al Enviar Obreros",
      precio: 12000,
      imagen: "https://m.media-amazon.com/images/I/61COzzMahfS._SY522_.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 2,
      nombre: "Porque En Favor De La Vida",
      precio: 10000,
      imagen:
        "https://static.clclibros.com/_CLCPanama/images/products/large/4819.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 3,
      nombre: "Traspaso Generacional",
      precio: 15000,
      imagen:
        "https://emmausbogota.com/wp-content/uploads/2022/09/EL-TRASPASO-portada.png",
    },
    {
      className: "tarjeta-libro",
      id: 4,
      nombre: "Explorer Vida",
      precio: 20000,
      imagen: "https://m.media-amazon.com/images/I/81LG0cl+4BL._SY522_.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 5,
      nombre: "Los Mensajes Mayores De Los Profetas Menores",
      precio: 6000,
      imagen:
        "https://cdn.agapea.com/Clie/Los-mensajes-mayores-de-los-profetas-menores-i1n601989.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 6,
      nombre: "El Quinto Evangelio",
      precio: 25000,
      imagen:
        "https://m.media-amazon.com/images/I/41IJT7KsndL._SY445_SX342_.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 7,
      nombre: "Que Hace Dios Cuando Oramos?",
      precio: 9000,
      imagen:
        "https://imgs.search.brave.com/MViH-G8VbHxRvyTensVUKP6IeymZ41QqzyFNvNtlGOI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF85/NjA5OTUtTUxNNTA1/OTc0NjM5NzJfMDcy/MDIyLU8tbGlicm8t/cXVlLWhhY2UtZGlv/cy1jdWFuZG8tb3Jh/bW9zLWRhdmlkLXdp/bGtlcnNvbi53ZWJw",
    },
    {
      className: "tarjeta-libro",
      id: 8,
      nombre: "Cambios Profundos",
      precio: 18000,
      imagen:
        "https://imgs.search.brave.com/l3sc8BzxzRrb3yxC6qLb9_iZKkk0r6vqagljZsMr1t0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDErZHh4MUpCOEwu/anBn",
    },
    {
      className: "tarjeta-libro",
      id: 9,
      nombre: "Un Año De Cambios",
      precio: 20000,
      imagen:
        "https://imgs.search.brave.com/FQuBAV9xr8K16dMrwW5vJW3R5AEdjZwccSa5kronwQg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWl0aWVuZGFldmFu/Z2VsaWNhLmNvbS9w/b3J0YWRhcy85Nzg4/NDA5MzQzMTE5Lmpw/Zw",
    },
    {
      className: "tarjeta-libro",
      id: 10,
      nombre: "Mi Lugar En Su Mision",
      precio: 20000,
      imagen:
        "https://imgs.search.brave.com/DMnrmq31Io8z4bT5eTmudjehd4wCvo4EWLJc1qpKXgY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFDdUh2OWNkb0wu/anBn",
    },
    {
      className: "tarjeta-libro",
      id: 11,
      nombre: "Descubre-El-Camino",
      precio: 18000,
      imagen:
        "https://imgs.search.brave.com/_5sFOo1Kwb32vYYtdI_6u7_T_yxs2c0Suo6URuKXtW4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFqU2Qzd0tlaEwu/anBn",
    },
    {
      className: "tarjeta-libro",
      id: 12,
      nombre: "Devocional una pausa en tu vida",
      precio: 9000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 13,
      nombre: "Mas gotas",
      precio: 10000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 14,
      nombre: "Sal de tu zona de comodidad",
      precio: 10000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 15,
      nombre: "Cumple tu destino",
      precio: 18000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 16,
      nombre: "Testigos",
      precio: 18000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 17,
      nombre: "A fin de conocerle",
      precio: 30000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 18,
      nombre: "Deberes Mutuos. Carlos Morris",
      precio: 25000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 19,
      nombre: "Mas alla de las sombras. Carlos Morris",
      precio: 25000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 20,
      nombre: "Estudio Biblico Expositivo de Marcos. Carlos Morris",
      precio: 40000,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 21,
      nombre: "Avivamiento Hasta lo ultimo De la Tierra",
      precio: 3500,
      imagen: "",
    },
    {
      className: "tarjeta-libro",
      id: 22,
      nombre: "Conciencia Misionera",
      precio: 12000,
      imagen: "",
    },
  ]);

  const resultados = items.filter(
    (item) =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.id.toString().includes(busqueda)
  );

  return (
    <>
      <header className="home-header">
        <img alt="" className="home-logo" />
        <h1 className="titulo">Tienda Misiones</h1>
      </header>
      <div className="contenedor-principal">
        <div className="fila">
          <input
            type="text"
            placeholder="Busca el libro por nombre ..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="buscador"
          />

          <div className="contenedor-libros">
            {resultados.map((item) => (
              <Link
                to={`/libros/${item.id}`}
                key={item.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="tarjeta-libro">
                  <img src={item.imagen} alt={item.nombre} />
                  <h3 className="titulo-libro">
                    {item.nombre.replace(/\s+/g, " ").trim()}
                  </h3>
                  <p className="precio">
                    ${item.precio.toLocaleString("es-AR")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <img className="logo" src={imagen} alt="Logo de misiones" />
        </div>
      </div>
    </>
  );
};
export default Libros;
