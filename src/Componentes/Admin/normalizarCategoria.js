const normalizarTexto = (texto = "") =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const categoriasConocidas = {
  biblia: "Biblias",
  biblias: "Biblias",
  libro: "Libros",
  libros: "Libros",
  remera: "Remeras",
  remeras: "Remeras",
  util: "Útiles",
  utiles: "Útiles",
  cuaderno: "Útiles",
  cuadernos: "Útiles",
  accesorio: "Otros",
  accesorios: "Otros",
  otro: "Otros",
  otros: "Otros",
};

export const normalizarCategoria = (categoria) =>
  categoriasConocidas[normalizarTexto(categoria)] || "Otros";

export const obtenerCategoriaProducto = (producto) => {
  const nombre = normalizarTexto(producto?.nombre);
  const esBiblia =
    nombre.includes("biblia") &&
    !/abecedario|trivia|sopa de letras|funda|guia|pintar|colorear|historias biblicas|aventuras biblicas/.test(
      nombre,
    );

  if (esBiblia) return "Biblias";
  if (nombre.includes("remera")) return "Remeras";
  return normalizarCategoria(producto?.categoria);
};
