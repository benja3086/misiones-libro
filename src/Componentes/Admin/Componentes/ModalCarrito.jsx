const ModalCarrito = ({
  carrito,
  productos,
  totalCarrito,
  cantidadTotalCarrito,
  metodoPago,
  setMetodoPago,
  nombreComprador,
  setNombreComprador,
  comentario,
  setComentario,
  error,
  cargando,
  agregarAlCarrito,
  quitarDelCarrito,
  eliminarDelCarrito,
  cerrarModalCarrito,
  confirmarVenta,
}) => (
  <div className="overlay">
    <div className="modal" style={{ maxWidth: "480px", width: "100%" }}>
      <h3 style={{ marginBottom: "1rem" }}>🛒 Confirmar venta</h3>

      <div
        style={{
          marginBottom: "1rem",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #eee",
        }}
      >
        {carrito.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "500" }}>{item.nombre}</div>
              {item.codigo && (
                <div style={{ fontSize: "12px", color: "#0066cc" }}>
                  #{item.codigo}
                </div>
              )}
              <div style={{ fontSize: "12px", color: "#888" }}>
                ${Number(item.precio).toLocaleString("es-AR")} c/u
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <button
                className="btn sm"
                onClick={() => quitarDelCarrito(item.id)}
                style={{ padding: "0 8px" }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: "20px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {item.cantidad}
              </span>
              <button
                className="btn sm"
                onClick={() => agregarAlCarrito(item)}
                disabled={
                  item.cantidad >=
                  Number(productos.find((p) => p.id === item.id)?.stock || 0)
                }
                style={{ padding: "0 8px" }}
              >
                +
              </button>
            </div>

            <div
              style={{
                minWidth: "80px",
                textAlign: "right",
                fontWeight: "600",
              }}
            >
              ${(Number(item.precio) * item.cantidad).toLocaleString("es-AR")}
            </div>

            <button
              onClick={() => eliminarDelCarrito(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#bbb",
                fontSize: "16px",
                padding: "0 4px",
              }}
            >
              ✕
            </button>
          </div>
        ))}

        <div
          style={{
            padding: "10px 12px",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "700",
            fontSize: "15px",
            background: "#fafafa",
          }}
        >
          <span>
            Total ({cantidadTotalCarrito} producto
            {cantidadTotalCarrito !== 1 ? "s" : ""})
          </span>
          <span>${totalCarrito.toLocaleString("es-AR")}</span>
        </div>
      </div>

      <div className="field">
        <label>Método de pago</label>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <button
            className={`btn ${metodoPago === "efectivo" ? "primary" : ""}`}
            onClick={() => setMetodoPago("efectivo")}
          >
            💵 Efectivo
          </button>
          <button
            className={`btn ${metodoPago === "transferencia" ? "primary" : ""}`}
            onClick={() => setMetodoPago("transferencia")}
          >
            🏦 Transferencia
          </button>
        </div>
      </div>

      {metodoPago === "transferencia" && (
        <div className="field" style={{ marginTop: "1rem" }}>
          <label>Nombre del comprador</label>
          <input
            value={nombreComprador}
            onChange={(e) => setNombreComprador(e.target.value)}
            placeholder="Ej: Juan Pérez"
          />
        </div>
      )}

      <div className="field" style={{ marginTop: "1rem" }}>
        <label>Comentario (opcional)</label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Ej: entrega a domicilio, factura..."
        />
      </div>

      {error && <p className="err">{error}</p>}

      <div className="modal-foot">
        <button
          className="btn"
          onClick={cerrarModalCarrito}
          disabled={cargando}
        >
          Cancelar
        </button>
        <button
          className="btn primary"
          onClick={confirmarVenta}
          disabled={cargando}
        >
          {cargando
            ? "Registrando..."
            : `Confirmar ${cantidadTotalCarrito} venta${cantidadTotalCarrito !== 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  </div>
);

export default ModalCarrito;