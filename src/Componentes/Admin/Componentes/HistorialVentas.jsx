import FiltrosVentas from "./FiltrosVentas";

const HistorialVentas = ({
  ventasAgrupadas,
  getVentaId,
  getProveedorVenta,
  eliminarGrupoVenta,
  filtroDesde,
  setFiltroDesde,
  filtroHasta,
  setFiltroHasta,
  isAdmin,
  filtroVendedor,
  setFiltroVendedor,
  vendedoresUnicos,
  filtroMetodo,
  setFiltroMetodo,
  filtroProvedor,
  setFiltroProvedor,
  provedoresUnicos,
  limpiarFiltros,
  ventasFiltradas,
}) => {
  return (
    <>
      <div className="ap-heading" style={{ marginBottom: "1rem" }}>
        {isAdmin ? "Historial de ventas" : "Mis ventas"}
      </div>

      <FiltrosVentas
        filtroDesde={filtroDesde}
        setFiltroDesde={setFiltroDesde}
        filtroHasta={filtroHasta}
        setFiltroHasta={setFiltroHasta}
        isAdmin={isAdmin}
        filtroVendedor={filtroVendedor}
        setFiltroVendedor={setFiltroVendedor}
        vendedoresUnicos={vendedoresUnicos}
        filtroMetodo={filtroMetodo}
        setFiltroMetodo={setFiltroMetodo}
        filtroProvedor={filtroProvedor}
        setFiltroProvedor={setFiltroProvedor}
        provedoresUnicos={provedoresUnicos}
        limpiarFiltros={limpiarFiltros}
        ventasFiltradas={ventasFiltradas}
      />

      <div className="card-list">
        {ventasAgrupadas.length === 0 && (
          <p className="empty">No hay ventas registradas</p>
        )}

        {ventasAgrupadas.map((grupo) => (
          <div className="prod-card" key={grupo.key}>
            <div className="prod-card-top">
              <div className="prod-card-nombre">
                Venta ({grupo.items.length} producto
                {grupo.items.length !== 1 ? "s" : ""})
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                <span className="cat">{grupo.metodoPago}</span>
              </div>
            </div>

            <div className="prod-card-body">
              <span className="prod-card-precio">
                Total: ${grupo.total.toLocaleString("es-AR")}
              </span>
            </div>

            <div style={{ marginTop: "0.4rem" }}>
              {grupo.items.map((item, i) => (
                <div
                  key={getVentaId(item) || `${grupo.key}-${i}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    fontSize: "0.88rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <span>
                    • {item.producto?.nombre}
                    {item.producto?.codigo ? (
                      <>
                        {" "}
                        <span
                          className="cat"
                          style={{
                            background: "#e0f0ff",
                            color: "#0066cc",
                          }}
                        >
                          #{item.producto.codigo}
                        </span>
                      </>
                    ) : null}
                    {getProveedorVenta(item)
                      ? ` (${getProveedorVenta(item)})`
                      : ""}
                  </span>

                  <span>
                    $
                    {Number(item.producto?.precio || 0).toLocaleString(
                      "es-AR",
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginTop: "0.4rem",
              }}
            >
              {grupo.nombreComprador && (
                <span>📲 {grupo.nombreComprador} · </span>
              )}

              <span>🧑‍💼 {grupo.usuario} · </span>

              <span>
                🕐{" "}
                {new Date(grupo.fecha).toLocaleString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </span>

              {grupo.comentario && (
                <div style={{ marginTop: "4px" }}>
                  💬 {grupo.comentario}
                </div>
              )}
            </div>

            {grupo.items.every((item) => getVentaId(item)) && (
              <div className="prod-card-actions venta-card-actions">
                <button
                  className="btn sm danger"
                  onClick={() => eliminarGrupoVenta(grupo)}
                >
                  🗑️ Eliminar venta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Productos</th>
              <th>Detalle</th>
              <th>Total</th>
              <th>Método</th>
              <th>Comprador</th>
              <th>Vendedor</th>
              <th>Comentario</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {ventasAgrupadas.length === 0 && (
              <tr>
                <td colSpan="9" className="empty">
                  No hay ventas
                </td>
              </tr>
            )}

            {ventasAgrupadas.map((grupo) => (
              <tr key={grupo.key}>
                <td>{grupo.items.length}</td>

                <td>
                  {grupo.items.map((item, i) => (
                    <div key={getVentaId(item) || `${grupo.key}-${i}`}>
                      {item.producto?.codigo ? (
                        <span
                          className="cat"
                          style={{
                            background: "#e0f0ff",
                            color: "#0066cc",
                          }}
                        >
                          #{item.producto.codigo}
                        </span>
                      ) : null}{" "}
                      {item.producto?.nombre || "-"} · $
                      {Number(item.producto?.precio || 0).toLocaleString(
                        "es-AR",
                      )}
                      {getProveedorVenta(item)
                        ? ` · ${getProveedorVenta(item)}`
                        : ""}
                    </div>
                  ))}
                </td>

                <td>${grupo.total.toLocaleString("es-AR")}</td>

                <td>
                  <span className="cat">{grupo.metodoPago}</span>
                </td>

                <td>{grupo.nombreComprador || "-"}</td>

                <td>{grupo.usuario}</td>

                <td>{grupo.comentario || "-"}</td>

                <td>
                  {new Date(grupo.fecha).toLocaleString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </td>

                <td>
                  {grupo.items.every((item) => getVentaId(item)) ? (
                    <button
                      className="btn sm danger"
                      onClick={() => eliminarGrupoVenta(grupo)}
                    >
                      🗑️
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistorialVentas;