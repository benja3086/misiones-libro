
const Buscador = ({ busqueda, setBusqueda, resultados = [] }) => {
  return (
    <div className="contenedor-principal">
      <div className="buscador-contenedor">
        <input
          type="text"
          placeholder="Busca el libro por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
      </div>
      <div className="contenedor-libros">
        {resultados.map((item) => (
          <div className="tarjeta-libro" key={item.id}>
            <img src={item.imagen} alt={item.nombre} />
            <h3>{item.nombre}</h3>
            <p className="precio">${item.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscador;