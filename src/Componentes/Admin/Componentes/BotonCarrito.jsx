const BotonCarrito = ({
  producto,
  cantidadEnCarrito,
  stockReal,
  sinStock,
  agregarAlCarrito,
  quitarDelCarrito,
}) => {
  const agotado = sinStock || cantidadEnCarrito >= stockReal;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {cantidadEnCarrito > 0 && (
        <>
          <button
            className="btn sm"
            onClick={() => quitarDelCarrito(producto.id)}
            style={{ padding: "0 9px", fontWeight: "bold" }}
          >
            −
          </button>
          <span
            style={{
              minWidth: "18px",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            {cantidadEnCarrito}
          </span>
        </>
      )}
      <button
        className="btn sm primary"
        onClick={() => agregarAlCarrito(producto)}
        disabled={agotado}
      >
        {sinStock ? "Sin stock" : cantidadEnCarrito > 0 ? "+" : "Agregar"}
      </button>
    </div>
  );
};

export default BotonCarrito;