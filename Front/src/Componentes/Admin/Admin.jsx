import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Admin.css";

const API = import.meta.env.VITE_API_URL;

const ordenarPorCodigo = (arr) =>
  [...arr].sort((a, b) => {
    const ca = (a.codigo || "").toLowerCase();
    const cb = (b.codigo || "").toLowerCase();
    if (ca === "" && cb === "") return 0;
    if (ca === "") return 1;
    if (cb === "") return -1;
    if (ca.length !== cb.length) return ca.length - cb.length;
    return ca.localeCompare(cb, "es");
  });

const Admin = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seccion, setSeccion] = useState("productos");
  const [modalVenta, setModalVenta] = useState(null);
  const [metodoPago, setMetodoPago] = useState(null);
  const [nombreComprador, setNombreComprador] = useState("");
  const [comentario, setComentario] = useState("");
  const [modalEditar, setModalEditar] = useState(null);
  const [formEditar, setFormEditar] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/productos`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProductos(ordenarPorCodigo(data));
      })
      .catch(() => setError("Error al cargar productos"));
  }, []);

  useEffect(() => {
    if (seccion === "historial" || seccion === "ganancias") {
      fetch(`${API}/ventas`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => (Array.isArray(data) ? setVentas(data) : setVentas([])))
        .catch(() => setVentas([]));
    }
  }, [seccion]);

  const filtrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.codigo && p.codigo.toLowerCase().includes(busqueda.toLowerCase())),
  );

  const gananciasPorProducto = ventas.reduce((acc, v) => {
    const nombre = v.producto.nombre;
    const precio = Number(v.producto.precio) || 0;
    if (!acc[nombre]) acc[nombre] = { nombre, cantidad: 0, total: 0 };
    acc[nombre].cantidad += 1;
    acc[nombre].total += precio;
    return acc;
  }, {});
  const gananciasArray = Object.values(gananciasPorProducto).sort((a, b) => b.total - a.total);
  const totalGeneral = gananciasArray.reduce((acc, g) => acc + g.total, 0);

  const sinStock = (p) => !p.stock || Number(p.stock) <= 0;

  const abrirModalVenta = (p) => {
    if (sinStock(p)) return setError("Este producto no tiene stock disponible.");
    setModalVenta(p);
    setMetodoPago(null);
    setNombreComprador("");
    setComentario("");
    setError("");
  };
  const cerrarModalVenta = () => {
    setModalVenta(null);
    setMetodoPago(null);
    setNombreComprador("");
    setComentario("");
    setError("");
  };

  const confirmarVenta = async () => {
    if (!metodoPago) return setError("Seleccioná un método de pago.");
    if (metodoPago === "transferencia" && !nombreComprador.trim())
      return setError("Ingresá el nombre del comprador.");

    try {
      const res = await fetch(`${API}/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          producto: {
            id: modalVenta.id,
            nombre: modalVenta.nombre,
            precio: modalVenta.precio,
          },
          metodoPago,
          nombreComprador: metodoPago === "transferencia" ? nombreComprador : null,
          comentario: comentario.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        return setError(data.error || "Error al registrar la venta");
      }

      setProductos((prev) =>
        ordenarPorCodigo(
          prev.map((p) =>
            p.id === modalVenta.id ? { ...p, stock: p.stock - 1 } : p,
          ),
        ),
      );

      cerrarModalVenta();
      alert("✅ Venta registrada correctamente");
    } catch {
      setError("Error al registrar la venta");
    }
  };

  const abrirModalEditar = (p) => {
    setFormEditar({ ...p, codigo: p.codigo || "" });
    setModalEditar(p.id);
    setError("");
  };
  const cerrarModalEditar = () => {
    setModalEditar(null);
    setFormEditar({});
    setError("");
  };
  const guardarEdicion = async () => {
    if (!formEditar.nombre || formEditar.precio === "")
      return setError("Nombre y precio son obligatorios.");
    try {
      const { _id, ...datos } = formEditar;
      const datosFinales = {
        ...datos,
        precio: Number(datos.precio),
        stock: Number(datos.stock),
      };
      await fetch(`${API}/productos/${modalEditar}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(datosFinales),
      });
      setProductos((prev) =>
        ordenarPorCodigo(
          prev.map((p) => p.id === modalEditar ? { ...p, ...datosFinales } : p),
        ),
      );
      cerrarModalEditar();
    } catch {
      setError("Error al guardar los cambios");
    }
  };

  const StockBadge = ({ stock }) => {
    const s = Number(stock);
    if (isNaN(s) || s <= 0) return <span className="badge out">Sin stock</span>;
    if (s <= 5) return <span className="badge low">{s} unid.</span>;
    return <span className="badge ok">{s} unid.</span>;
  };

  const BtnVendido = ({ p }) => (
    <button
      className="btn sm primary"
      onClick={() => abrirModalVenta(p)}
      disabled={sinStock(p)}
    >
      {sinStock(p) ? "Sin stock" : "Vendido"}
    </button>
  );

  return (
    <div className="ap">
      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <button className={`btn ${seccion === "productos" ? "primary" : ""}`} onClick={() => setSeccion("productos")}>
          📦 Productos
        </button>
        {isAdmin && (
          <>
            <button className={`btn ${seccion === "historial" ? "primary" : ""}`} onClick={() => setSeccion("historial")}>
              📋 Historial
            </button>
            <button className={`btn ${seccion === "ganancias" ? "primary" : ""}`} onClick={() => setSeccion("ganancias")}>
              💰 Ganancias
            </button>
          </>
        )}
      </div>

      {/* ── PRODUCTOS ── */}
      {seccion === "productos" && (
        <>
          <div className="ap-top">
            <div>
              <div className="ap-heading">Productos</div>
              <div className="ap-sub">{filtrados.length} producto{filtrados.length !== 1 ? "s" : ""}</div>
            </div>
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
            {filtrados.length === 0 && <p className="empty">No hay productos</p>}
            {filtrados.map((p) => (
              <div className="prod-card" key={p.id}>
                <div className="prod-card-top">
                  <div>
                    <div className="prod-card-nombre">{p.nombre}</div>
                    <div className="prod-card-autor">{p.autor}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                    <span className="cat">{p.categoria}</span>
                    {p.codigo && (
                      <span className="cat" style={{ background: "#e0f0ff", color: "#0066cc" }}>#{p.codigo}</span>
                    )}
                  </div>
                </div>
                <div className="prod-card-body">
                  <span className="prod-card-precio">${Number(p.precio).toLocaleString("es-AR")}</span>
                  <StockBadge stock={p.stock} />
                </div>
                <div className="prod-card-actions">
                  {isAdmin && <button className="btn sm" onClick={() => abrirModalEditar(p)}>✏️ Editar</button>}
                  <BtnVendido p={p} />
                </div>
              </div>
            ))}
          </div>

          {/* Tabla desktop */}
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Autor</th><th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length === 0 && <tr><td colSpan="7" className="empty">No hay productos</td></tr>}
                {filtrados.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.codigo
                        ? <span className="cat" style={{ background: "#e0f0ff", color: "#0066cc" }}>#{p.codigo}</span>
                        : "-"}
                    </td>
                    <td>{p.nombre}</td>
                    <td><span className="cat">{p.categoria}</span></td>
                    <td>${Number(p.precio).toLocaleString("es-AR")}</td>
                    <td><StockBadge stock={p.stock} /></td>
                    <td>{p.autor}</td>
                    <td>
                      <div className="td-actions">
                        {isAdmin && <button className="btn sm" onClick={() => abrirModalEditar(p)}>✏️ Editar</button>}
                        <BtnVendido p={p} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── HISTORIAL ── */}
      {seccion === "historial" && isAdmin && (
        <>
          <div className="ap-heading" style={{ marginBottom: "1rem" }}>Historial de ventas</div>
          <div className="card-list">
            {ventas.length === 0 && <p className="empty">No hay ventas registradas</p>}
            {ventas.map((v, i) => (
              <div className="prod-card" key={i}>
                <div className="prod-card-top">
                  <div className="prod-card-nombre">{v.producto.nombre}</div>
                  <span className="cat">{v.metodoPago}</span>
                </div>
                <div className="prod-card-body">
                  <span className="prod-card-precio">${Number(v.producto.precio).toLocaleString("es-AR")}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.4rem" }}>
                  {v.nombreComprador && <span>👤 {v.nombreComprador} · </span>}
                  <span>🧑‍💼 {v.usuario} · </span>
                  <span>🕐 {new Date(v.fecha).toLocaleString("es-AR")}</span>
                  {v.comentario && <div style={{ marginTop: "4px" }}>💬 {v.comentario}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Producto</th><th>Precio</th><th>Método</th><th>Comprador</th><th>Vendedor</th><th>Comentario</th><th>Fecha</th></tr>
              </thead>
              <tbody>
                {ventas.length === 0 && <tr><td colSpan="7" className="empty">No hay ventas</td></tr>}
                {ventas.map((v, i) => (
                  <tr key={i}>
                    <td>{v.producto.nombre}</td>
                    <td>${Number(v.producto.precio).toLocaleString("es-AR")}</td>
                    <td><span className="cat">{v.metodoPago}</span></td>
                    <td>{v.nombreComprador || "-"}</td>
                    <td>{v.usuario}</td>
                    <td>{v.comentario || "-"}</td>
                    <td>{new Date(v.fecha).toLocaleString("es-AR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── GANANCIAS ── */}
      {seccion === "ganancias" && isAdmin && (
        <>
          <div className="ap-heading" style={{ marginBottom: "0.5rem" }}>Ganancias por producto</div>
          <div style={{ marginBottom: "1.5rem", fontSize: "14px", color: "#666" }}>
            Total general:{" "}
            <strong style={{ color: "#111", fontSize: "18px" }}>${totalGeneral.toLocaleString("es-AR")}</strong>
          </div>
          <div className="card-list">
            {gananciasArray.length === 0 && <p className="empty">No hay ventas registradas</p>}
            {gananciasArray.map((g, i) => (
              <div className="prod-card" key={i}>
                <div className="prod-card-top">
                  <div className="prod-card-nombre">{g.nombre}</div>
                  <span className="cat">{g.cantidad} venta{g.cantidad !== 1 ? "s" : ""}</span>
                </div>
                <div className="prod-card-precio">${g.total.toLocaleString("es-AR")}</div>
              </div>
            ))}
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Producto</th><th>Ventas</th><th>Total recaudado</th></tr>
              </thead>
              <tbody>
                {gananciasArray.length === 0 && <tr><td colSpan="3" className="empty">No hay ventas</td></tr>}
                {gananciasArray.map((g, i) => (
                  <tr key={i}>
                    <td>{g.nombre}</td>
                    <td>{g.cantidad}</td>
                    <td><strong>${g.total.toLocaleString("es-AR")}</strong></td>
                  </tr>
                ))}
                {gananciasArray.length > 0 && (
                  <tr style={{ background: "#f9f9f9" }}>
                    <td><strong>TOTAL</strong></td>
                    <td><strong>{ventas.length}</strong></td>
                    <td><strong>${totalGeneral.toLocaleString("es-AR")}</strong></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── MODAL VENTA ── */}
      {modalVenta && (
        <div className="overlay">
          <div className="modal">
            <h3>Registrar venta</h3>
            <p style={{ marginBottom: "1rem" }}>
              <strong>{modalVenta.nombre}</strong> — ${Number(modalVenta.precio).toLocaleString("es-AR")}
            </p>
            <div className="field">
              <label>Método de pago</label>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <button className={`btn ${metodoPago === "efectivo" ? "primary" : ""}`} onClick={() => setMetodoPago("efectivo")}>
                  💵 Efectivo
                </button>
                <button className={`btn ${metodoPago === "transferencia" ? "primary" : ""}`} onClick={() => setMetodoPago("transferencia")}>
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
                placeholder="Ej: el cliente pidió factura, entrega a domicilio..."
              />
            </div>
            {error && <p className="err">{error}</p>}
            <div className="modal-foot">
              <button className="btn" onClick={cerrarModalVenta}>Cancelar</button>
              <button className="btn primary" onClick={confirmarVenta}>Confirmar venta</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL EDITAR ── */}
      {modalEditar && (
        <div className="overlay">
          <div className="modal">
            <h3>Editar producto</h3>
            <div className="field">
              <label>Código</label>
              <input
                value={formEditar.codigo || ""}
                onChange={(e) => setFormEditar((f) => ({ ...f, codigo: e.target.value }))}
                placeholder="Ej: A, B, AC..."
              />
            </div>
            <div className="field">
              <label>Nombre</label>
              <input
                value={formEditar.nombre || ""}
                onChange={(e) => setFormEditar((f) => ({ ...f, nombre: e.target.value }))}
              />
            </div>
            <div className="grid2">
              <div className="field">
                <label>Precio ($)</label>
                <input
                  type="number"
                  value={formEditar.precio || ""}
                  onChange={(e) => setFormEditar((f) => ({ ...f, precio: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Stock</label>
                <input
                  type="number"
                  value={formEditar.stock || ""}
                  onChange={(e) => setFormEditar((f) => ({ ...f, stock: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid2">
              <div className="field">
                <label>Categoría</label>
                <select
                  value={formEditar.categoria || "libros"}
                  onChange={(e) => setFormEditar((f) => ({ ...f, categoria: e.target.value }))}
                >
                  <option value="libros">Libros</option>
                  <option value="remeras">Remeras</option>
                  <option value="utiles">Útiles</option>
                  <option value="cuadernos">Cuadernos</option>
                  <option value="accesorios">Accesorios</option>
                </select>
              </div>
              <div className="field">
                <label>Autor</label>
                <input
                  value={formEditar.autor || ""}
                  onChange={(e) => setFormEditar((f) => ({ ...f, autor: e.target.value }))}
                />
              </div>
            </div>
            <div className="field">
              <label>Descripción</label>
              <input
                value={formEditar.descripcion || ""}
                onChange={(e) => setFormEditar((f) => ({ ...f, descripcion: e.target.value }))}
              />
            </div>
            <div className="field">
              <label>URL de imagen</label>
              <input
                value={typeof formEditar.imagen === "string" ? formEditar.imagen : ""}
                onChange={(e) => setFormEditar((f) => ({ ...f, imagen: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            {error && <p className="err">{error}</p>}
            <div className="modal-foot">
              <button className="btn" onClick={cerrarModalEditar}>Cancelar</button>
              <button className="btn primary" onClick={guardarEdicion}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;