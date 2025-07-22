import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import imagen from "../assets/fondo-blanco.png";
import "./Producto.css";

const Producto = () => {
  const [busqueda, setBusqueda] = useState("");

  const { categoria } = useParams();
  const categoriaSeleccionada = categoria?.toLowerCase() || null;

  const [items] = useState([
    {
      className: "tarjeta-libro",
      id: 1,
      nombre: "Sirviendo Al Enviar Obreros",
      precio: 12000,
      imagen: "https://m.media-amazon.com/images/I/61COzzMahfS._SY522_.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 2,
      nombre: "Porque En Favor De La Vida",
      precio: 10000,
      descripcion: `Ningún tema divide tanto ni es tan controversial como el aborto. Con un estilo conciso, sin agresividad, Randy Alcorn ofrece respuestas sensibles y ciertas a las cuestiones principales del debate sobre el aborto.`,
      imagen:
        "https://static.clclibros.com/_CLCPanama/images/products/large/4819.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 3,
      nombre: "Traspaso Generacional",
      precio: 15000,
      depscription: "hola",
      imagen:
        "https://emmausbogota.com/wp-content/uploads/2022/09/EL-TRASPASO-portada.png",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 4,
      nombre: "Explorer Vida",
      precio: 20000,
      imagen: "https://m.media-amazon.com/images/I/81LG0cl+4BL._SY522_.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 5,
      nombre: "Los Mensajes Mayores De Los Profetas Menores",
      precio: 6000,
      imagen:
        "https://cdn.agapea.com/Clie/Los-mensajes-mayores-de-los-profetas-menores-i1n601989.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 6,
      nombre: "El Quinto Evangelio",
      precio: 25000,
      imagen:
        "https://m.media-amazon.com/images/I/41IJT7KsndL._SY445_SX342_.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 7,
      nombre: "Que Hace Dios Cuando Oramos?",
      precio: 9000,
      imagen:
        "https://imgs.search.brave.com/MViH-G8VbHxRvyTensVUKP6IeymZ41QqzyFNvNtlGOI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF85/NjA5OTUtTUxNNTA1/OTc0NjM5NzJfMDcy/MDIyLU8tbGlicm8t/cXVlLWhhY2UtZGlv/cy1jdWFuZG8tb3Jh/bW9zLWRhdmlkLXdp/bGtlcnNvbi53ZWJw",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 8,
      nombre: "Cambios Profundos",
      precio: 18000,
      imagen:
        "https://imgs.search.brave.com/l3sc8BzxzRrb3yxC6qLb9_iZKkk0r6vqagljZsMr1t0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDErZHh4MUpCOEwu/anBn",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 9,
      nombre: "Un Año De Cambios",
      precio: 20000,
      imagen:
        "https://imgs.search.brave.com/FQuBAV9xr8K16dMrwW5vJW3R5AEdjZwccSa5kronwQg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWl0aWVuZGFldmFu/Z2VsaWNhLmNvbS9w/b3J0YWRhcy85Nzg4/NDA5MzQzMTE5Lmpw/Zw",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 10,
      nombre: "Mi Lugar En Su Mision",
      precio: 20000,
      imagen:
        "https://imgs.search.brave.com/DMnrmq31Io8z4bT5eTmudjehd4wCvo4EWLJc1qpKXgY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFDdUh2OWNkb0wu/anBn",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 11,
      nombre: "Descubre-El-Camino",
      precio: 18000,
      imagen:
        "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/sin-titulo-2-721dcd60de5f66537c17333521248357-1024-1024.webp",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 12,
      nombre: "Devocional una pausa en tu vida",
      precio: 9000,
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLIeua1n-YVwA-GKtxKqlx2DOL_XQ4Y9FxTYlZYOBWLH0qVa5ftPQBJjKPWXHTokwvnM&usqp=CAU",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 13,
      nombre: "Mas gotas",
      precio: 10000,
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaEeBxyyLRQ9FF8zLzvvryqTeO_-aatjl1HXHeIuzG8NL7gGJkfhnlK_JyrLxIjFKu5Lg&usqp=CAU",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 14,
      nombre: "Sal de tu zona de comodidad",
      precio: 10000,
      imagen: "https://m.media-amazon.com/images/I/61kP4D1OLAL._SY522_.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 15,
      nombre: "Cumple tu destino",
      precio: 18000,
      imagen:
        "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/cumple-tu-destino-eae2738c5f04488f9e17467279262099-640-0.webp",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 16,
      nombre: "Testigos",
      precio: 18000,
      imagen:
        "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/testigos-1101aabba39724438a17338615165871-1024-1024.webp",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 17,
      nombre: "A fin de conocerle",
      precio: 30000,
     imagen: "AFinDeConocerle.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 18,
      nombre: "Deberes Mutuos",
      autor: "Carlos Morris",
      precio: 25000,
      imagen: "https://http2.mlstatic.com/D_872076-MLA51547308585_092022-C.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 19,
      nombre: "Mas alla de las sombras",
      autor: "Carlos Morris",
      precio: 25000,
      imagen:
        "https://http2.mlstatic.com/D_NQ_NP_647088-MLA51326669364_082022-O.webp",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 20,
      nombre: "Estudio Biblico Expositivo de Marcos",
      precio: 40000,
      imagen: "/EstudioBiblico.jpg",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 21,
      nombre: "Avivamiento Hasta lo ultimo De la Tierra",
      precio: 3500,
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6G2evoHzziTSwXZeqDlekethgexee4WHou1GlOP8x8p3JP1nioXTSc91gejgNlpZv9Zc&usqp=CAU",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 22,
      nombre: "Conciencia Misionera",
      precio: 12000,
      imagen: "https://files.logoscdn.com/v1/assets/1420401/optimized",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 23,
      nombre: "PLANIFICADOR CON IMAN",
      precio: 8000,
      imagen: "https://acdn-us.mitiendanube.com/stores/001/171/588/products/planner-imantado-4-flores1-d24297ff42e48c50c516121377837727-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 24,
      nombre: "SEÑALADORES IMANTADOS",
      precio: 4000,
      imagen: [
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/1f85f795-617c-49df-901d-44e3d48d104b1-6d135d68737946ffab16781127077353-1024-1024.webp",
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/e0d78914-1483-4afc-9462-529751d70ef41-3c9bff4768384f7c9316781127077210-1024-1024.webp",
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/5442a795-ac32-4a41-aa3a-204c590e19451-a6dcdddaa4c8da261316781127077392-1024-1024.webp",
      ],
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 25,
      nombre: "CUADERNO TAPA DURA A4",
      precio: 12000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuaderno-a4-letering-negro1-1b63a50fb459b8fe7916024405359528-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 26,
      nombre: "CUADERNO TAPA DURA MEDIANO",
      precio: 10500,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/mediano-amor-0afa3017db8fb9119817071384973658-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 27,
      nombre: "CUADERNO CHICO A5 100 HOJAS",
      precio: 9000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuaderno-a5-lineas-negras1-883eb8f3a8438ecd6c16024456072285-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 29,
      nombre: "CUADERNO CUADRADO",
      precio: 8000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuadrado-flores-21-3956e4f14dd3e2a0e816196997049911-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 30,
      nombre: "CUADERNO TAPA FLEXIBLE A4",
      precio: 8000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/chico-tropical-todo-ayuda1-b109f4da4c878c481516018445439460-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 31,
      nombre: "CUADERNO TAPA FLEXIBLE MEDIANO",
      precio: 12000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/mediano-flores-rosas-y-celeste1-e3297fc6fa198ce08116759461834674-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
      stock: 0, 
    },
    
    {
      className: "tarjeta-libro",
      id: 33,
      nombre: "CUADERNO ANILLADO ARRIBA TAPA FLEXIBLE",
      precio: 5000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_50921-b95205d4c1b9894a3916841556157303-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 34,
      nombre: "AVENTURAS BIBLICAS SOPA DE LETRAS",
      precio: 5000,
      imagen: "https://acdn-us.mitiendanube.com/stores/001/171/588/products/paginas-desdecatalogo-herederos-del-reino-dia-del-nino-20231-cf5c981510322f3b0d16916707632294-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 35,
      nombre: "CUADERNO CHICO TAPA FLEXIBLE",
      precio: 12000,
      imagen: "",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
      stock: 0, 
    },
    {
      className: "tarjeta-libro",
      id: 36,
      nombre: "CUADERNO POCKET TAPA DURA",
      precio: 7000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuaderno-pocket-flores-02-95a9a4447a386819d317264330280210-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 37,
      nombre: "BLOCK PARA HELADERA",
      precio: 3000,
      imagen: "https://acdn-us.mitiendanube.com/stores/001/171/588/products/21-fee90948ebdf980fd416430501194787-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 38,
      nombre: "POSA VASOS",
      precio: 700,
      imagen: "PortaVaso.jpg",
      autor: "",
      categoria: "accesorios",
    },
    {
      className: "tarjeta-libro",
      id: 39,
      nombre: "LAPICERAS",
      precio: 1500,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/730f4416-7767-46fc-b769-005d68b05acc1-fcf0761dd669180a8616806272351142-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 40,
      nombre: "LA VIDA ETERNA",
      precio: 1000,
      imagen:
        "https://m.media-amazon.com/images/I/6168Jfzl9tL._UF1000,1000_QL80_.jpg",
      autor: "Santa Fe Ediciones",
      categoria: "libros",
    },
    {
      className: "tarjeta-libro",
      id: 41,
      nombre: "MINI AGENDA PLANIFICADOR",
      precio: 3000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_0841-38cf9246bdbffab58f17294582197630-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 42,
      nombre: "AGENDAS PEDIATRICAS",
      precio: 12000,
      imagen: "https://http2.mlstatic.com/D_NQ_NP_831071-MLA82918836482_032025-O.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 43,
      nombre: "DIARIO DEVOCIONAL",
      precio: 10000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/5-8eb15bd493b17adec117264342665651-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 44,
      nombre: "Libro Para Niños - Para colorear * DAVID",
      precio: 5500,
      imagen: "https://acdn-us.mitiendanube.com/stores/001/171/588/products/aventuras-de-david-blanco-y-negro_pagina_01-a65fe9a0adb7e4b7c917227982623215-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "cuadernos",
    },
    {
      className: "tarjeta-libro",
      id: 45,
      nombre: "AGENDA PLANNER",
      precio: 6000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_65421-b372159e5b18cd8db016945247482363-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 46,
      nombre: "CAJAS DE PROMESAS",
      precio: "sin stock", 
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/promesas1-ef8623060c40b3bfd116248845633588-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 47,
      nombre: "DEVOCIONAL PARA PINTAR",
      precio: 6000,
      imagen:[ "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_35601-c9c99d926e65394e1416031237722133-1024-1024.webp",
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/interior-11-54360f46d46f4bd6b216031237715109-480-0.webp",
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/31-684dd50d3d4064529116031316461701-1024-1024.webp"
      ],
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 48,
      nombre: "ANOTADOR HORIZONTAL 2 EN 1",
      precio: 9000,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/anotador-montana1-5983f5f33319fac71216045977472210-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 49,
      nombre: "HISTORIAS BIBLICAS PARA COLOREAR",
      precio: 5000,
      imagen:[ "https://acdn-us.mitiendanube.com/stores/001/171/588/products/aventuras-de-david-blanco-y-negro_pagina_01-a65fe9a0adb7e4b7c917227982623215-1024-1024.webp",
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/aventuras-de-jose-para-colorear_pagina_07-6b40312816feba5e0e17227982047965-1024-1024.webp"],
        autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 50,
      nombre: "ABECEDARIO DE LA BIBLIA",
      precio: 5500,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/tapas-el-abecedarios-de-la-biblia-publis_pagina_1-2d2ea0ffa21e40858a17227987250938-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 51,
      nombre: "LIBROS DE NUMEROS Y DE ANIMALES",
      precio: 4000,
      imagen: "https://acdn-us.mitiendanube.com/stores/001/171/588/products/tapa-libros-numeros-2020-copia1-908145713911b3f3ce16031201639910-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 52,
      nombre: "BLOCK ORGANIZACIONAL",
      precio: 3500,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/001/171/588/products/56f969c2-4e30-460a-9e1c-a15f9a657ae7-f372dae93ebab45d0816438999386314-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "utiles",
    },
    {
      className: "tarjeta-libro",
      id: 53,
      nombre: "REMERAS",
      precio: 12000,
      imagen: "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/the-four-da03c2509ae2620c3517333369608440-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "remeras",
    },
       {
      className: "tarjeta-libro",
      id: 54,
      nombre: "REMERAS",
      precio: 12000,
      imagen: "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/cumple-tu-destino-a-e00a9f3dbe1a8ff21217292059095413-1024-1024.webp",
      autor: "Santa Fe Ediciones",
      categoria: "remeras",
    },
      {
      className: "tarjeta-libro",
      id: 55,
      nombre: "Socorro, Quiero vivir",
      precio: 6000,
      imagen: "SocorroQuiero.jpg",
      autor: "Pablo Mazzuh",
      categoria: "libros",
    },
  ]);

  const resultados = items.filter((item) => {
    const coincideCategoria =
      !categoriaSeleccionada || item.categoria === categoriaSeleccionada;
    const coincideBusqueda =
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.id.toString().includes(busqueda);
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <>
      <header className="home-header">
        <img alt="" className="home-logo" />
        <h1 className="titulo">Tienda Misiones</h1>
      </header>

      <div className="buscador-contenedor">
        <input
          type="text"
          placeholder="Busca por nombre o ID..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        <button className="boton-lupa" type="submit">
          <svg
            className="icono-lupa"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="contenedor-libros">
        {resultados.map((item) => (
          <Link
            to={`/libros/${item.id}`}
            key={item.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="tarjeta-libro">
              {item.imagen &&
                (Array.isArray(item.imagen) ? (
                  <img src={item.imagen[0]} alt={item.nombre} />
                ) : (
                  <img src={item.imagen} alt={item.nombre} />
                ))}
              <h3 className="titulo-libro">{item.nombre.trim()}</h3>
              <p className="precio">${item.precio.toLocaleString("es-AR")}</p>
                 {/* 👇 Cartel de sin stock */}
        {item.stock === 0 && (
          <p className="sin-stock">Sin stock</p>
        )}
            </div>
          </Link>
        ))}
      </div>

      <img className="logo" src={imagen} alt="Logo de misiones" />
    </>
  );
};

export default Producto;
