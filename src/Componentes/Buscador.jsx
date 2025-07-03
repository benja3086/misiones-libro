
return (
   <>
      <Home />
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
              <div className="tarjeta-libro" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <h3>{item.nombre}</h3>
                <p className="precio">${item.precio}</p>
              </div>
            ))}
          </div>
          <img
            className="logo"
            src={imagen}
            alt="Logo de misiones"
          />
          <img
            className="logo1"
            src={imagen}
            alt="Logo de misiones"
          />
        </div>
      </div>
    </>
  );
export default Buscador;