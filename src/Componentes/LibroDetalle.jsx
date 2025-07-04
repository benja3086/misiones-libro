import { useParams } from "react-router-dom";
import React from "react"
import "./LibroDetalle.css";

const libros = [
  {
      className: "tarjeta-libro",
      id: 1,
      nombre: "Sirviendo Al Enviar Obreros",
      precio: 1200,
      imagen: "https://m.media-amazon.com/images/I/61COzzMahfS._SY522_.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 2,
      nombre: "Porque En Favor De La Vida",
      precio: 1200,
      imagen:
        "https://static.clclibros.com/_CLCPanama/images/products/large/4819.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 3,
      nombre: "Traspaso Generacional",
      precio: 1200,
      imagen:
        "https://emmausbogota.com/wp-content/uploads/2022/09/EL-TRASPASO-portada.png",
    },
    {
      className: "tarjeta-libro",
      id: 4,
      nombre: "Explorer Vida",
      precio: 1200,
      imagen: "https://m.media-amazon.com/images/I/81LG0cl+4BL._SY522_.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 5,
      nombre: "Los Mensajes Mayores De Los Profetas Menores",
      precio: 1200,
      imagen:
        "https://cdn.agapea.com/Clie/Los-mensajes-mayores-de-los-profetas-menores-i1n601989.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 6,
      nombre: "El Quinto Evangelio",
      precio: 1200,
      imagen:
        "https://m.media-amazon.com/images/I/41IJT7KsndL._SY445_SX342_.jpg",
    },
    {
      className: "tarjeta-libro",
      id: 7,
      nombre: "Que Hace Dios Cuando Oramos? ",
      precio: 1200,
      imagen:
        "https://imgs.search.brave.com/MViH-G8VbHxRvyTensVUKP6IeymZ41QqzyFNvNtlGOI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF85/NjA5OTUtTUxNNTA1/OTc0NjM5NzJfMDcy/MDIyLU8tbGlicm8t/cXVlLWhhY2UtZGlv/cy1jdWFuZG8tb3Jh/bW9zLWRhdmlkLXdp/bGtlcnNvbi53ZWJw",
    },
    {
      className: "tarjeta-libro",
      id: 8,
      nombre: "Cambios Profundos",
      precio: 1200,
      imagen:
        "https://imgs.search.brave.com/l3sc8BzxzRrb3yxC6qLb9_iZKkk0r6vqagljZsMr1t0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDErZHh4MUpCOEwu/anBn",
    },
    {
      className: "tarjeta-libro",
      id: 9,
      nombre: "Un Año De Cambios",
      precio: 1200,
      imagen:
        "https://imgs.search.brave.com/FQuBAV9xr8K16dMrwW5vJW3R5AEdjZwccSa5kronwQg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWl0aWVuZGFldmFu/Z2VsaWNhLmNvbS9w/b3J0YWRhcy85Nzg4/NDA5MzQzMTE5Lmpw/Zw",
    },
    {
      className: "tarjeta-libro",
      id: 10,
      nombre: "Mi Lugar En Su Mision",
      precio: 1200,
      imagen:
      "https://imgs.search.brave.com/DMnrmq31Io8z4bT5eTmudjehd4wCvo4EWLJc1qpKXgY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFDdUh2OWNkb0wu/anBn",
    },
    {
      className: "tarjeta-libro",
      id: 11,
      nombre: "Descubre-El-Camino",
      precio: 1200,
      autor:"jesus",
      descripcion:
        "Un libro que te ayudará a descubrir el camino de la vida cristiana y cómo vivirlo plenamente.",
      imagen:
        "https://imgs.search.brave.com/_5sFOo1Kwb32vYYtdI_6u7_T_yxs2c0Suo6URuKXtW4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFqU2Qzd0tlaEwu/anBn",
    },
  ];

const LibroDetalle = () => {
  const { id } = useParams();
  const libro = libros.find((l) => l.id === parseInt(id));

  if (!libro) return <h2>Libro no encontrado</h2>;

  return (
    <div className="detalle-libro">
      <img src={libro.imagen} alt={libro.nombre} />
      <div className="detalle-libro-contenido">
        <h2>{libro.nombre}</h2>
        <p className="autor">Autor: {libro.autor ? libro.autor : "Desconocido"}</p>
        <p className="precio">Precio: ${libro.precio}</p>
        <p>{libro.descripcion}</p>
      </div>
    </div>
  );
};

export default LibroDetalle;
