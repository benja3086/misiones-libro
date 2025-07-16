import { useParams } from "react-router-dom";
import React from "react";
import "./LibroDetalle.css";

const libros = [
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
    imagen: "https://m.media-amazon.com/images/I/41IJT7KsndL._SY445_SX342_.jpg",
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
  {
    className: "tarjeta-libro",
    id: 23,
    nombre: "PLANIFICADOR CON IMAN",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/planner-imantado-4-flores1-d24297ff42e48c50c516121377837727-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 24,
    nombre: "SEÑALADORES IMANTADOS",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 25,
    nombre: "CUADERNO TAPA DURA A4",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuaderno-a4-letering-negro1-1b63a50fb459b8fe7916024405359528-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 26,
    nombre: "CUADERNO TAPA DURA MEDIANO",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/mediano-amor-0afa3017db8fb9119817071384973658-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 27,
    nombre: "CUADERNO CHICO A5 100 HOJAS",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuaderno-a5-lineas-negras1-883eb8f3a8438ecd6c16024456072285-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 28,
    nombre: "CUADERNO CHICO A5 75 HOJAS",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 29,
    nombre: "CUADERNO CUADRADO",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuadrado-flores-21-3956e4f14dd3e2a0e816196997049911-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 30,
    nombre: "CUADERNO TAPA FLEXIBLE A4",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/chico-tropical-todo-ayuda1-b109f4da4c878c481516018445439460-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 31,
    nombre: "CUADERNO TAPA FLEXIBLE MEDIANO",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/mediano-flores-rosas-y-celeste1-e3297fc6fa198ce08116759461834674-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 32,
    nombre: "DIARIO HOJA COLOR",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 33,
    nombre: "CUADERNO ANILLADO ARRIBA TAPA FLEXIBLE",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_50921-b95205d4c1b9894a3916841556157303-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 34,
    nombre: "AVENTURAS BIBLICAS SOPA DE LETRAS",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 35,
    nombre: "CUADERNO CHICO TAPA FLEXIBLE",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 36,
    nombre: "CUADERNO POCKET TAPA DURA",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/cuaderno-pocket-flores-02-95a9a4447a386819d317264330280210-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 37,
    nombre: "BLOCK CON IMAN",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 38,
    nombre: "POSA VASOS",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 39,
    nombre: "LAPICERAS",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/730f4416-7767-46fc-b769-005d68b05acc1-fcf0761dd669180a8616806272351142-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 40,
    nombre: "LA VIDA ETERNA",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 41,
    nombre: "MINI AGENDA PLANIFICADOR",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_0841-38cf9246bdbffab58f17294582197630-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 42,
    nombre: "AGENDAS PEDIATRICAS",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 43,
    nombre: "DIARIO DEVOCIONAL",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/5-8eb15bd493b17adec117264342665651-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 44,
    nombre: "LIBRETA NIÑOS HOJA DE COLOR",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 45,
    nombre: "AGENDA PLANNER",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_65421-b372159e5b18cd8db016945247482363-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 46,
    nombre: "CAJAS DE PROMESAS",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/promesas1-ef8623060c40b3bfd116248845633588-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 47,
    nombre: "DEVOCIONAL PARA PINTAR",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/img_3559-21-45ebf0b3f3c976230716031283575498-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 48,
    nombre: "ANOTADOR HORIZONTAL 2 EN 1",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/anotador-montana1-5983f5f33319fac71216045977472210-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 49,
    nombre: "HISTORIAS BIBLICAS PARA COLOREAR",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 50,
    nombre: "ABECEDARIO DE LA BIBLIA",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/tapas-el-abecedarios-de-la-biblia-publis_pagina_1-2d2ea0ffa21e40858a17227987250938-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 51,
    nombre: "LIBROS DE NUMEROS Y DE ANIMALES",
    precio: 12000,
    imagen: "",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 52,
    nombre: "BLOCK ORGANIZACIONAL",
    precio: 12000,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/001/171/588/products/56f969c2-4e30-460a-9e1c-a15f9a657ae7-f372dae93ebab45d0816438999386314-1024-1024.webp",
    autor: "Santa Fe Ediciones",
  },
  {
    className: "tarjeta-libro",
    id: 53,
    nombre: "BOTELLA ALUMINIO",
    precio: 12000,
    imagen:
      "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/imagen-de-whatsapp-2025-05-13-a-las-17-03-51_6828c9da-21e9e22467cf36e41617472558652778-1024-1024.webp",
    autor: "Movida",
  },
  {
    className: "tarjeta-libro",
    id: 54,
    nombre: "CUADERNO VAYAN POR TODO EL MUNDO",
    precio: 12000,
    imagen:
      "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/vayan-a-todo-el-mundo-gris-01-f234a4ebb7777bc7df17440707461430-1024-1024.webp",
    autor: "Movida",
  },
  {
    className: "tarjeta-libro",
    id: 55,
    nombre: "TOTE BAGS MOVIDA",
    precio: 12000,
    imagen:
      "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/imagen-de-whatsapp-2025-05-13-a-las-16-51-16_47590c7f-1975cdad59c33a974d17472554106069-1024-1024.webp",
    autor: "Movida",
  },
  {
    className: "tarjeta-libro",
    id: 56,
    nombre: "GORRAS MOVIDA",
    precio: 12000,
    imagen:
      "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/imagen-de-whatsapp-2025-05-13-a-las-16-51-15_6698d100-daf5ff0603bd11b04d17472534694428-1024-1024.webp",
    autor: "Movida",
  },
  {
    className: "tarjeta-libro",
    id: 57,
    nombre: "PILUSOS",
    precio: 12000,
    imagen:
      "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/solo-por-gracia-11d9025189869e1c8517441295176269-1024-1024.webp",
    autor: "Movida",
  },
  {
    className: "tarjeta-libro",
    id: 58,
    nombre: "REMERAS",
    precio: 12000,
    imagen:
      "https://dcdn-us.mitiendanube.com/stores/005/344/522/products/cumple-tu-destino-a-e00a9f3dbe1a8ff21217292059095413-1024-1024.webp",
    autor: "Movida",
  },
  {
    className: "tarjeta-libro",
    id: 59,
    nombre: "BOTELLA PLASTICA",
    precio: 12000,
    imagen: "",
    autor: "Movida",
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
        <p className="autor">
          Autor: {libro.autor ? libro.autor : "Desconocido"}
        </p>
        <p className="precio">Precio: ${libro.precio}</p>
        <p>{libro.descripcion}</p>
      </div>
    </div>
  );
};

export default LibroDetalle;
