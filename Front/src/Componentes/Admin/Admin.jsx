import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import "./Admin.css";

const API = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

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

  // ── Carrito ──
  const [carrito, setCarrito] = useState([]);
  const [modalCarrito, setModalCarrito] = useState(false);
  const [metodoPago, setMetodoPago] = useState(null);
  const [nombreComprador, setNombreComprador] = useState("");
  const [comentario, setComentario] = useState("");

  // ── Modal editar / nuevo ──
  const [modalNuevo, setModalNuevo] = useState(false);
  const [formNuevo, setFormNuevo] = useState({
    codigo: "",
    nombre: "",
    categoria: "libros",
    precio: "",
    stock: "",
    provedor: "",
    descripcion: "",
    imagen: "",
  });
  const [modalEditar, setModalEditar] = useState(null);
  const [formEditar, setFormEditar] = useState({});

  const [error, setError] = useState("");
  const [ventaExitosa, setVentaExitosa] = useState(false);
  const [cargando, setCargando] = useState(false);

  // ── Filtros ──
  const [filtroDesde, setFiltroDesde] = useState("");
  const [filtroHasta, setFiltroHasta] = useState("");
  const [filtroVendedor, setFiltroVendedor] = useState("");
  const [filtroMetodo, setFiltroMetodo] = useState("");
  const [filtroProvedor, setFiltroProvedor] = useState("");

  useEffect(() => {
    fetch(`${API}/productos`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProductos(ordenarPorCodigo(data));
      })
      .catch(() => setError("Error al cargar productos"));
  }, []);

  useEffect(() => {
    if (seccion === "historial" || seccion === "ganancias") {
      fetch(`${API}/ventas`, {
        credentials: "include",
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then((res) => res.json())
        .then((data) => (Array.isArray(data) ? setVentas(data) : setVentas([])))
        .catch(() => setVentas([]));
    }
  }, [seccion]);

  // ── Carrito: funciones ──
  const agregarAlCarrito = (p) => {
    if (!p.stock || Number(p.stock) <= 0) return;
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === p.id);
      if (existe) {
        if (existe.cantidad >= Number(p.stock)) return prev;
        return prev.map((item) =>
          item.id === p.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );
      }
      return [...prev, { ...p, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.cantidad <= 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i,
      );
    });
  };

  const eliminarDelCarrito = (id) =>
    setCarrito((prev) => prev.filter((i) => i.id !== id));

  const totalCarrito = carrito.reduce(
    (acc, i) => acc + Number(i.precio) * i.cantidad,
    0,
  );
  const cantidadTotalCarrito = carrito.reduce((a, i) => a + i.cantidad, 0);

  const abrirModalCarrito = () => {
    if (carrito.length === 0) return;
    setMetodoPago(null);
    setNombreComprador("");
    setComentario("");
    setError("");
    setModalCarrito(true);
  };

  const cerrarModalCarrito = () => {
    setModalCarrito(false);
    setError("");
  };

  // ── Confirmar venta ──
  const confirmarVenta = async () => {
    if (!metodoPago) return setError("Seleccioná un método de pago.");
    if (metodoPago === "transferencia" && !nombreComprador.trim())
      return setError("Ingresá el nombre del comprador.");

    setCargando(true);
    setError("");

    try {
      const llamadas = carrito.flatMap((item) =>
        Array.from({ length: item.cantidad }, () =>
          fetch(`${API}/ventas`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            credentials: "include",
            body: JSON.stringify({
              producto: {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
              },
              metodoPago,
              nombreComprador:
                metodoPago === "transferencia" ? nombreComprador : null,
              comentario: comentario.trim() || null,
            }),
          }).then((r) => r.json()),
        ),
      );

      const resultados = await Promise.all(llamadas);
      const hayError = resultados.find((r) => r.error);
      if (hayError) {
        setError(hayError.error || "Error al registrar alguna venta");
        setCargando(false);
        return;
      }

      setProductos((prev) =>
        ordenarPorCodigo(
          prev.map((p) => {
            const item = carrito.find((i) => i.id === p.id);
            if (!item) return p;
            return { ...p, stock: Number(p.stock) - item.cantidad };
          }),
        ),
      );

      setCarrito([]);
      cerrarModalCarrito();
      setVentaExitosa(true);
    } catch {
      setError("Error al registrar las ventas");
    } finally {
      setCargando(false);
    }
  };

  // ── Eliminar venta ──
  const eliminarVenta = async (id) => {
    if (!id) return setError("No se pudo identificar la venta a eliminar.");
    if (!window.confirm("¿Seguro que querés eliminar esta venta?")) return;
    try {
      const res = await fetch(`${API}/ventas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setVentas((prev) => prev.filter((v) => v._id !== id));
    } catch {
      setError("Error al eliminar la venta");
    }
  };

  // ── Nuevo producto ──
  const abrirModalNuevo = () => {
    setFormNuevo({
      codigo: "",
      nombre: "",
      categoria: "libros",
      precio: "",
      stock: "",
      provedor: "",
      descripcion: "",
      imagen: "",
    });
    setError("");
    setModalNuevo(true);
  };

  const cerrarModalNuevo = () => {
    setModalNuevo(false);
    setError("");
  };

  const guardarNuevoProducto = async () => {
    if (!formNuevo.nombre || formNuevo.precio === "")
      return setError("Nombre y precio son obligatorios.");

    try {
      const datos = {
        ...formNuevo,
        precio: Number(formNuevo.precio),
        stock: Number(formNuevo.stock || 0),
      };

      const res = await fetch(`${API}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
        body: JSON.stringify(datos),
      });

      if (!res.ok) throw new Error();
      const nuevo = await res.json();
      setProductos((prev) => ordenarPorCodigo([...prev, nuevo]));
      cerrarModalNuevo();
    } catch {
      setError("Error al crear el producto");
    }
  };

  // ── Editar producto ──
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
        body: JSON.stringify(datosFinales),
      });

      setProductos((prev) =>
        ordenarPorCodigo(
          prev.map((p) =>
            p.id === modalEditar ? { ...p, ...datosFinales } : p,
          ),
        ),
      );
      cerrarModalEditar();
    } catch {
      setError("Error al guardar los cambios");
    }
  };

  // ── Eliminar producto ──
  const eliminarProducto = async (id) => {
    if (!id) return setError("No se pudo identificar el producto a eliminar.");
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;

    try {
      const res = await fetch(`${API}/productos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
        credentials: "include",
      });

      if (!res.ok) throw new Error();
      setProductos((prev) => prev.filter((p) => p.id !== id));
      setCarrito((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("Error al eliminar el producto");
    }
  };

  // ── Filtros / cálculos ──
  const vendedoresUnicos = [...new Set(ventas.map((v) => v.usuario))].sort();
  const provedoresUnicos = [
    ...new Set(ventas.map((v) => v.producto?.provedor).filter(Boolean)),
  ].sort();

  const ventasFiltradas = ventas.filter((v) => {
    if (!isAdmin && v.usuario !== user?.username) return false;
    const fecha = new Date(v.fecha);
    if (filtroDesde && fecha < new Date(filtroDesde)) return false;
    if (filtroHasta && fecha > new Date(filtroHasta + "T23:59:59"))
      return false;
    if (filtroVendedor && v.usuario !== filtroVendedor) return false;
    if (filtroMetodo && v.metodoPago !== filtroMetodo) return false;
    if (filtroProvedor && v.producto?.provedor !== filtroProvedor) return false;
    return true;
  });

  const limpiarFiltros = () => {
    setFiltroDesde("");
    setFiltroHasta("");
    setFiltroVendedor("");
    setFiltroMetodo("");
    setFiltroProvedor("");
  };

  const gananciasPorProducto = ventasFiltradas.reduce((acc, v) => {
    const nombre = v.producto.nombre;
    const precio = Number(v.producto.precio) || 0;
    if (!acc[nombre]) acc[nombre] = { nombre, cantidad: 0, total: 0 };
    acc[nombre].cantidad += 1;
    acc[nombre].total += precio;
    return acc;
  }, {});

  const gananciasArray = Object.values(gananciasPorProducto).sort(
    (a, b) => b.total - a.total,
  );
  const totalGeneral = gananciasArray.reduce((acc, g) => acc + g.total, 0);
  const getVentaId = (venta) => venta?._id || venta?.id || null;

  const filtrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.codigo && p.codigo.toLowerCase().includes(busqueda.toLowerCase())),
  );

  const sinStock = (p) => !p.stock || Number(p.stock) <= 0;
  const cantidadEnCarrito = (id) =>
    carrito.find((i) => i.id === id)?.cantidad || 0;

  // ── Subcomponentes ──
  const StockBadge = ({ stock }) => {
    const s = Number(stock);
    if (isNaN(s) || s <= 0) return <span className="badge out">Sin stock</span>;
    if (s <= 5) return <span className="badge low">{s} unid.</span>;
    return <span className="badge ok">{s} unid.</span>;
  };

  const BtnCarrito = ({ p }) => {
    const en = cantidadEnCarrito(p.id);
    const stockReal = Number(productos.find((x) => x.id === p.id)?.stock || 0);
    const agotado = sinStock(p) || en >= stockReal;

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {en > 0 && (
          <>
            <button
              className="btn sm"
              onClick={() => quitarDelCarrito(p.id)}
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
              {en}
            </span>
          </>
        )}
        <button
          className="btn sm primary"
          onClick={() => agregarAlCarrito(p)}
          disabled={agotado}
        >
          {sinStock(p) ? "Sin stock" : en > 0 ? "+" : "Agregar"}
        </button>
      </div>
    );
  };

  const FiltrosVentas = () => (
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

  return (
    <div className="ap">
      {/* ── TABS + BOTÓN CARRITO ── */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button
          className={`btn ${seccion === "productos" ? "primary" : ""}`}
          onClick={() => setSeccion("productos")}
        >
          📦 Productos
        </button>

        <button
          className={`btn ${seccion === "historial" ? "primary" : ""}`}
          onClick={() => setSeccion("historial")}
        >
          📋 Historial
        </button>

        {isAdmin && (
          <button
            className={`btn ${seccion === "ganancias" ? "primary" : ""}`}
            onClick={() => setSeccion("ganancias")}
          >
            💰 Ventas
          </button>
        )}

        {carrito.length > 0 && (
          <button
            className="btn primary"
            onClick={abrirModalCarrito}
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            🛒
            <span
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: "99px",
                padding: "1px 7px",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {cantidadTotalCarrito}
            </span>
            <span>${totalCarrito.toLocaleString("es-AR")}</span>
          </button>
        )}
      </div>

      {/* ── PRODUCTOS ── */}
      {seccion === "productos" && (
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
                    <div className="prod-card-provedor">{p.provedor}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "4px",
                    }}
                  >
                    <span className="cat">{p.categoria}</span>
                    {p.codigo && (
                      <span
                        className="cat"
                        style={{ background: "#e0f0ff", color: "#0066cc" }}
                      >
                        #{p.codigo}
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
                        style={{ color: "#e53e3e", borderColor: "#e53e3e" }}
                      >
                        🗑️ Eliminar
                      </button>
                    </>
                  )}
                  <BtnCarrito p={p} />
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
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Provedor</th>
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
                          style={{ background: "#e0f0ff", color: "#0066cc" }}
                        >
                          #{p.codigo}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{p.nombre}</td>
                    <td>
                      <span className="cat">{p.categoria}</span>
                    </td>
                    <td>${Number(p.precio).toLocaleString("es-AR")}</td>
                    <td>
                      <StockBadge stock={p.stock} />
                    </td>
                    <td>{p.provedor}</td>
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
                        <BtnCarrito p={p} />
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
      {seccion === "historial" && (
        <>
          <div className="ap-heading" style={{ marginBottom: "1rem" }}>
            {isAdmin ? "Historial de ventas" : "Mis ventas"}
          </div>
          <FiltrosVentas />

          <div className="card-list">
            {ventasFiltradas.length === 0 && (
              <p className="empty">No hay ventas registradas</p>
            )}
            {ventasFiltradas.map((v, i) => (
              <div className="prod-card" key={getVentaId(v) || i}>
                <div className="prod-card-top">
                  <div className="prod-card-nombre">{v.producto.nombre}</div>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <span className="cat">{v.metodoPago}</span>
                    <button
                      className="btn sm"
                      onClick={() => eliminarVenta(getVentaId(v))}
                      disabled={!getVentaId(v)}
                      style={{ color: "#e53e3e", borderColor: "#e53e3e" }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="prod-card-body">
                  <span className="prod-card-precio">
                    ${Number(v.producto.precio).toLocaleString("es-AR")}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    marginTop: "0.4rem",
                  }}
                >
                  {v.producto?.provedor && (
                    <span>📦 {v.producto.provedor} · </span>
                  )}
                  {v.nombreComprador && <span>👤 {v.nombreComprador} · </span>}
                  <span>🧑‍💼 {v.usuario} · </span>
                  <span>🕐 {new Date(v.fecha).toLocaleString("es-AR")}</span>
                  {v.comentario && (
                    <div style={{ marginTop: "4px" }}>💬 {v.comentario}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Proveedor</th>
                  <th>Precio</th>
                  <th>Método</th>
                  <th>Comprador</th>
                  <th>Vendedor</th>
                  <th>Comentario</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ventasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan="9" className="empty">
                      No hay ventas
                    </td>
                  </tr>
                )}
                {ventasFiltradas.map((v, i) => (
                  <tr key={getVentaId(v) || i}>
                    <td>{v.producto.nombre}</td>
                    <td>{v.producto?.provedor || "-"}</td>
                    <td>${Number(v.producto.precio).toLocaleString("es-AR")}</td>
                    <td>
                      <span className="cat">{v.metodoPago}</span>
                    </td>
                    <td>{v.nombreComprador || "-"}</td>
                    <td>{v.usuario}</td>
                    <td>{v.comentario || "-"}</td>
                    <td>{new Date(v.fecha).toLocaleString("es-AR")}</td>
                    <td>
                      <button
                        className="btn sm"
                        onClick={() => eliminarVenta(getVentaId(v))}
                        disabled={!getVentaId(v)}
                        style={{ color: "#e53e3e", borderColor: "#e53e3e" }}
                      >
                        🗑️
                      </button>
                    </td>
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
          <div className="ap-heading" style={{ marginBottom: "0.5rem" }}>
            Ganancias por producto
          </div>
          <FiltrosVentas />
          <div
            style={{ marginBottom: "1.5rem", fontSize: "14px", color: "#666" }}
          >
            Total general:{" "}
            <strong style={{ color: "#111", fontSize: "18px" }}>
              ${totalGeneral.toLocaleString("es-AR")}
            </strong>
          </div>

          <div className="card-list">
            {gananciasArray.length === 0 && (
              <p className="empty">No hay ventas registradas</p>
            )}
            {gananciasArray.map((g, i) => (
              <div className="prod-card" key={i}>
                <div className="prod-card-top">
                  <div className="prod-card-nombre">{g.nombre}</div>
                  <span className="cat">
                    {g.cantidad} venta{g.cantidad !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="prod-card-precio">
                  ${g.total.toLocaleString("es-AR")}
                </div>
              </div>
            ))}
          </div>

          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Ventas</th>
                  <th>Total recaudado</th>
                </tr>
              </thead>
              <tbody>
                {gananciasArray.length === 0 && (
                  <tr>
                    <td colSpan="3" className="empty">
                      No hay ventas
                    </td>
                  </tr>
                )}
                {gananciasArray.map((g, i) => (
                  <tr key={i}>
                    <td>{g.nombre}</td>
                    <td>{g.cantidad}</td>
                    <td>
                      <strong>${g.total.toLocaleString("es-AR")}</strong>
                    </td>
                  </tr>
                ))}
                {gananciasArray.length > 0 && (
                  <tr style={{ background: "#f9f9f9" }}>
                    <td>
                      <strong>TOTAL</strong>
                    </td>
                    <td>
                      <strong>{ventasFiltradas.length}</strong>
                    </td>
                    <td>
                      <strong>${totalGeneral.toLocaleString("es-AR")}</strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── MODAL CARRITO ── */}
      {modalCarrito && (
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
                        Number(
                          productos.find((p) => p.id === item.id)?.stock || 0,
                        )
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
                    $
                    {(Number(item.precio) * item.cantidad).toLocaleString(
                      "es-AR",
                    )}
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
              <div
                style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}
              >
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
      )}

      {/* ── MODAL NUEVO ── */}
      {modalNuevo && (
        <div className="overlay">
          <div className="modal">
            <h3>Nuevo producto</h3>
            <div className="field">
              <label>Código</label>
              <input
                value={formNuevo.codigo}
                onChange={(e) =>
                  setFormNuevo((f) => ({ ...f, codigo: e.target.value }))
                }
                placeholder="Ej: A, B, AC..."
              />
            </div>
            <div className="field">
              <label>Nombre</label>
              <input
                value={formNuevo.nombre}
                onChange={(e) =>
                  setFormNuevo((f) => ({ ...f, nombre: e.target.value }))
                }
              />
            </div>
            <div className="grid2">
              <div className="field">
                <label>Precio ($)</label>
                <input
                  type="number"
                  value={formNuevo.precio}
                  onChange={(e) =>
                    setFormNuevo((f) => ({ ...f, precio: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Stock</label>
                <input
                  type="number"
                  value={formNuevo.stock}
                  onChange={(e) =>
                    setFormNuevo((f) => ({ ...f, stock: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid2">
              <div className="field">
                <label>Categoría</label>
                <select
                  value={formNuevo.categoria}
                  onChange={(e) =>
                    setFormNuevo((f) => ({ ...f, categoria: e.target.value }))
                  }
                >
                  <option value="libros">Libros</option>
                  <option value="remeras">Remeras</option>
                  <option value="utiles">Útiles</option>
                  <option value="cuadernos">Cuadernos</option>
                  <option value="accesorios">Accesorios</option>
                </select>
              </div>
              <div className="field">
                <label>Provedor</label>
                <input
                  value={formNuevo.provedor}
                  onChange={(e) =>
                    setFormNuevo((f) => ({ ...f, provedor: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="field">
              <label>Descripción</label>
              <input
                value={formNuevo.descripcion}
                onChange={(e) =>
                  setFormNuevo((f) => ({ ...f, descripcion: e.target.value }))
                }
              />
            </div>
            <div className="field">
              <label>URL de imagen</label>
              <input
                value={formNuevo.imagen}
                onChange={(e) =>
                  setFormNuevo((f) => ({ ...f, imagen: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            {error && <p className="err">{error}</p>}
            <div className="modal-foot">
              <button className="btn" onClick={cerrarModalNuevo}>
                Cancelar
              </button>
              <button className="btn primary" onClick={guardarNuevoProducto}>
                Guardar
              </button>
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
                onChange={(e) =>
                  setFormEditar((f) => ({ ...f, codigo: e.target.value }))
                }
                placeholder="Ej: A, B, AC..."
              />
            </div>
            <div className="field">
              <label>Nombre</label>
              <input
                value={formEditar.nombre || ""}
                onChange={(e) =>
                  setFormEditar((f) => ({ ...f, nombre: e.target.value }))
                }
              />
            </div>
            <div className="grid2">
              <div className="field">
                <label>Precio ($)</label>
                <input
                  type="number"
                  value={formEditar.precio || ""}
                  onChange={(e) =>
                    setFormEditar((f) => ({ ...f, precio: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Stock</label>
                <input
                  type="number"
                  value={formEditar.stock || ""}
                  onChange={(e) =>
                    setFormEditar((f) => ({ ...f, stock: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid2">
              <div className="field">
                <label>Categoría</label>
                <select
                  value={formEditar.categoria || "libros"}
                  onChange={(e) =>
                    setFormEditar((f) => ({ ...f, categoria: e.target.value }))
                  }
                >
                  <option value="libros">Libros</option>
                  <option value="remeras">Remeras</option>
                  <option value="utiles">Útiles</option>
                  <option value="cuadernos">Cuadernos</option>
                  <option value="accesorios">Accesorios</option>
                </select>
              </div>
              <div className="field">
                <label>Provedor</label>
                <input
                  value={formEditar.provedor || ""}
                  onChange={(e) =>
                    setFormEditar((f) => ({ ...f, provedor: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="field">
              <label>Descripción</label>
              <input
                value={formEditar.descripcion || ""}
                onChange={(e) =>
                  setFormEditar((f) => ({ ...f, descripcion: e.target.value }))
                }
              />
            </div>
            <div className="field">
              <label>URL de imagen</label>
              <input
                value={
                  typeof formEditar.imagen === "string" ? formEditar.imagen : ""
                }
                onChange={(e) =>
                  setFormEditar((f) => ({ ...f, imagen: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            {error && <p className="err">{error}</p>}
            <div className="modal-foot">
              <button className="btn" onClick={cerrarModalEditar}>
                Cancelar
              </button>
              <button className="btn primary" onClick={guardarEdicion}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL VENTA EXITOSA ── */}
      {ventaExitosa && (
        <div className="overlay">
          <div className="modal" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>✅</div>
            <h3 style={{ marginBottom: "0.5rem" }}>¡Venta completada!</h3>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>
              La venta fue registrada correctamente.
            </p>
            <button
              className="btn primary"
              onClick={() => setVentaExitosa(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;