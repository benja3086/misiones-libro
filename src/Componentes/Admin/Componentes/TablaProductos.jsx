import StockBadge from "./StockBadge";
import BotonCarrito from "./BotonCarrito";

const TablaProducto = ({
  filtrados,
  busqueda,
  setBusqueda,
  abrirModalNuevo,
  abrirModalEditar,
  eliminarProducto,
  cantidadEnCarrito,
  productos,
  sinStock,
  agregarAlCarrito,
  quitarDelCarrito,
  isAdmin,
}) => {
  const getProveedorProducto = (producto) =>
    producto?.provedor || producto?.proveedor || producto?.autor || "";

  return (
    <>
      <div className="ap-top">
        <div>
          <div className="ap-heading">Productos</div>
          <div className="ap-sub">
            {filtrados.length} producto{filtrados.length !== 1 ? "s" : ""}
          </div>
        </div>

        {isAdmin && (
          <button className="btn primary" onClick={abrirModalNuevo}>
            + Nuevo producto
          </button>
        )}
      </div>

      <div className="ap-search">
        <input
          placeholder="Buscar por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Cards mobile */}
      <div className="card-list">
        {filtrados.length === 0 && (
          <p className="empty">No hay productos</p>
        )}

        {filtrados.map((p) => (
          <div className="prod-card" key={p.id}>
            <div className="prod-card-top">
              <div>
                <div className="prod-card-nombre">{p.nombre}</div>
                <div className="prod-card-provedor">
                  {getProveedorProducto(p)}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "4px",
                }}
              >
                <span className="cat">
                  Costo: $
                  {Number(p.precioCosto || 0).toLocaleString("es-AR")}
                </span>

                {p.codigo && (
                  <span
                    className="cat"
                    style={{
                      background: "#e0f0ff",
                      color: "#0066cc",
                    }}
                  >
                    {p.codigo}
                  </span>
                )}
              </div>
            </div>

            <div className="prod-card-body">
              <span className="prod-card-precio">
                ${Number(p.precio).toLocaleString("es-AR")}
              </span>

              <StockBadge stock={p.stock} />
            </div>

            <div className="prod-card-actions">
              {isAdmin && (
                <>
                  <button
                    className="btn sm"
                    onClick={() => abrirModalEditar(p)}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className="btn sm"
                    onClick={() => eliminarProducto(p.id)}
                    style={{
                      color: "#e53e3e",
                      borderColor: "#e53e3e",
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </>
              )}

              <BotonCarrito
                producto={p}
                cantidadEnCarrito={cantidadEnCarrito(p.id)}
                stockReal={Number(
                  productos.find((x) => x.id === p.id)?.stock || 0,
                )}
                sinStock={sinStock(p)}
                agregarAlCarrito={agregarAlCarrito}
                quitarDelCarrito={quitarDelCarrito}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tabla desktop */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio costo</th>
              <th>Precio venta</th>
              <th>Stock</th>
              <th>Proveedor</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.length === 0 && (
              <tr>
                <td colSpan="7" className="empty">
                  No hay productos
                </td>
              </tr>
            )}

            {filtrados.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.codigo ? (
                    <span
                      className="cat"
                      style={{
                        background: "#e0f0ff",
                        color: "#0066cc",
                      }}
                    >
                      {p.codigo}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td>{p.nombre}</td>

                <td>
                  ${Number(p.precioCosto || 0).toLocaleString("es-AR")}
                </td>

                <td>${Number(p.precio).toLocaleString("es-AR")}</td>

                <td>
                  <StockBadge stock={p.stock} />
                </td>

                <td>{getProveedorProducto(p) || "-"}</td>

                <td>
                  <div className="td-actions">
                    {isAdmin && (
                      <>
                        <button
                          className="btn sm"
                          onClick={() => abrirModalEditar(p)}
                        >
                          ✏️ Editar
                        </button>

                        <button
                          className="btn sm"
                          onClick={() => eliminarProducto(p.id)}
                          style={{
                            color: "#e53e3e",
                            borderColor: "#e53e3e",
                          }}
                        >
                          🗑️
                        </button>
                      </>
                    )}

                    <BotonCarrito
                      producto={p}
                      cantidadEnCarrito={cantidadEnCarrito(p.id)}
                      stockReal={Number(
                        productos.find((x) => x.id === p.id)?.stock || 0,
                      )}
                      sinStock={sinStock(p)}
                      agregarAlCarrito={agregarAlCarrito}
                      quitarDelCarrito={quitarDelCarrito}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablaProducto;
