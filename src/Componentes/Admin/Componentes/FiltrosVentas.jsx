const FiltrosVentas = ({
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
}) => (
  <div
    style={{
      background: "var(--ap-filter-bg, #f8f8f8)",
      border: "1px solid var(--ap-filter-border, #e8e8e8)",
      borderRadius: "12px",
      padding: "0.75rem 1rem",
      marginBottom: "1.25rem",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.6rem",
      }}
    >
      <div className="field" style={{ margin: 0 }}>
        <label>Desde</label>
        <input
          type="date"
          value={filtroDesde}
          onChange={(e) => setFiltroDesde(e.target.value)}
        />
      </div>
      <div className="field" style={{ margin: 0 }}>
        <label>Hasta</label>
        <input
          type="date"
          value={filtroHasta}
          onChange={(e) => setFiltroHasta(e.target.value)}
        />
      </div>

      {isAdmin && (
        <div className="field" style={{ margin: 0 }}>
          <label>Vendedor</label>
          <select
            value={filtroVendedor}
            onChange={(e) => setFiltroVendedor(e.target.value)}
          >
            <option value="">Todos</option>
            {vendedoresUnicos.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="field" style={{ margin: 0 }}>
        <label>Método de pago</label>
        <select
          value={filtroMetodo}
          onChange={(e) => setFiltroMetodo(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </div>

      <div className="field" style={{ margin: 0, gridColumn: "1 / -1" }}>
        <label>Proveedor</label>
        <select
          value={filtroProvedor}
          onChange={(e) => setFiltroProvedor(e.target.value)}
        >
          <option value="">Todos</option>
          {provedoresUnicos.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0.6rem",
      }}
    >
      <button className="btn" onClick={limpiarFiltros}>
        ✕ Limpiar
      </button>
      <span style={{ fontSize: "12px", color: "#999" }}>
        {ventasFiltradas.length} resultado
        {ventasFiltradas.length !== 1 ? "s" : ""}
      </span>
    </div>
  </div>
);

export default FiltrosVentas;