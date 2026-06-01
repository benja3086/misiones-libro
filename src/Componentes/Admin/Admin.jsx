import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import "./Admin.css";
import FiltrosVentas from "./Componentes/FiltrosVentas";
import StockBadge from "./Componentes/StockBadge";
import BotonCarrito from "./Componentes/BotonCarrito";
import ModalCarrito from "./Componentes/ModalCarrito";
import ProductoModal from "./Componentes/ProductoModal";
import HistorialVentas from "./Componentes/HistorialVentas";
import TablaProducto from "./Componentes/TablaProductos";

const API =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://misiones-back-production.up.railway.app");

const getToken = () => localStorage.getItem("token");
const MARCAS_VENTAS_KEY = "misiones_marcas_ventas";
const GANANCIA_COLOR = "#2563eb";

const leerMarcasVentas = () => {
  try {
    return JSON.parse(localStorage.getItem(MARCAS_VENTAS_KEY) || "{}");
  } catch {
    return {};
  }
};

const guardarMarcasVentas = (marcas) => {
  localStorage.setItem(MARCAS_VENTAS_KEY, JSON.stringify(marcas));
};

const aplicarMarcasLocales = (ventas) => {
  const marcas = leerMarcasVentas();
  return ventas.map((venta) => {
    const id = venta?._id || venta?.id;
    return id && marcas[id] ? { ...venta, marcaColor: marcas[id] } : venta;
  });
};

const normalizarTexto = (texto = "") =>
  texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();

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

const getProveedorProducto = (producto) =>
  producto?.provedor || producto?.proveedor || producto?.autor || "";

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
    precio: "",
    precioCosto: "",
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
  const [menuMarcaGananciasAbierto, setMenuMarcaGananciasAbierto] =
    useState(null);
  const botonCarritoRef = useRef(null);

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
        .then((data) =>
          Array.isArray(data)
            ? setVentas(aplicarMarcasLocales(data))
            : setVentas([]),
        )
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
    setTimeout(() => {
      botonCarritoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      botonCarritoRef.current?.focus({ preventScroll: true });
    }, 0);
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
      const grupoVentaId = `carrito-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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
                precioCosto: item.precioCosto || 0,
                codigo: item.codigo || "",
                provedor: getProveedorProducto(item),
                proveedor: getProveedorProducto(item),
                autor: getProveedorProducto(item),
              },
              metodoPago,
              nombreComprador:
                metodoPago === "transferencia" ? nombreComprador : null,
              comentario: comentario.trim() || null,
              grupoVentaId,
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
  const eliminarVenta = async (id, { skipConfirm = false } = {}) => {
    if (!id) return setError("No se pudo identificar la venta a eliminar.");
    if (
      !skipConfirm &&
      !window.confirm("¿Seguro que querés eliminar esta venta?")
    )
      return;
    try {
      const res = await fetch(`${API}/ventas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setVentas((prev) => prev.filter((v) => getVentaId(v) !== id));
    } catch {
      setError("Error al eliminar la venta");
    }
  };

  // ── Nuevo producto ──
  const abrirModalNuevo = () => {
    setFormNuevo({
      codigo: "",
      nombre: "",
      precio: "",
      precioCosto: "",
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
        precioCosto: Number(formNuevo.precioCosto || 0),
        stock: Number(formNuevo.stock || 0),
        proveedor: formNuevo.provedor || "",
        autor: formNuevo.provedor || "",
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
    setFormEditar({
      ...p,
      codigo: p.codigo || "",
      provedor: getProveedorProducto(p),
    });
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
        precioCosto: Number(datos.precioCosto || 0),
        stock: Number(datos.stock),
        proveedor: datos.provedor || "",
        autor: datos.provedor || "",
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
  const getProveedorVenta = (venta) => {
    const producto = productos.find(
      (item) => item.id === venta?.producto?.id,
    );

    return (
      venta?.producto?.provedor ||
      venta?.producto?.proveedor ||
      venta?.producto?.autor ||
      getProveedorProducto(producto) ||
      ""
    );
  };
  const vendedoresUnicos = [...new Set(ventas.map((v) => v.usuario))].sort();
  const provedoresUnicos = [
    ...new Set(ventas.map(getProveedorVenta).filter(Boolean)),
  ].sort();

  const ventasFiltradas = ventas.filter((v) => {
    if (!isAdmin && v.usuario !== user?.username) return false;
    const fecha = new Date(v.fecha);
    if (filtroDesde && fecha < new Date(filtroDesde)) return false;
    if (filtroHasta && fecha > new Date(filtroHasta + "T23:59:59"))
      return false;
    if (filtroVendedor && v.usuario !== filtroVendedor) return false;
    if (filtroMetodo && v.metodoPago !== filtroMetodo) return false;
    if (filtroProvedor && getProveedorVenta(v) !== filtroProvedor) return false;
    return true;
  });

  const limpiarFiltros = () => {
    setFiltroDesde("");
    setFiltroHasta("");
    setFiltroVendedor("");
    setFiltroMetodo("");
    setFiltroProvedor("");
  };

  const formatPesos = (valor) => `$${Number(valor || 0).toLocaleString("es-AR")}`;
  const getProductoVenta = (venta) =>
    productos.find((producto) => producto.id === venta?.producto?.id);
  const getCodigoVenta = (venta) =>
    venta?.producto?.codigo || getProductoVenta(venta)?.codigo || "";
  const getPrecioCostoVenta = (venta) => {
    const costoVenta = Number(venta?.producto?.precioCosto);
    if (!Number.isNaN(costoVenta) && costoVenta > 0) return costoVenta;

    const producto = getProductoVenta(venta);
    const costoProducto = Number(producto?.precioCosto);
    return Number.isNaN(costoProducto) ? 0 : costoProducto;
  };

  const gananciasPorProducto = ventasFiltradas.reduce((acc, v) => {
    const nombre = v.producto?.nombre || "Sin producto";
    const proveedor = getProveedorVenta(v) || "Sin proveedor";
    const codigo = getCodigoVenta(v);
    const precioVenta = Number(v.producto?.precio) || 0;
    const precioCosto = getPrecioCostoVenta(v);
    const key = `${codigo}-${nombre}-${proveedor}`;

    if (!acc[key]) {
      acc[key] = {
        key,
        codigo,
        nombre,
        proveedor,
        precioCosto,
        marcaColor: v.marcaColor || null,
        items: [],
        cantidad: 0,
        totalVenta: 0,
        pagarProveedor: 0,
        ganancia: 0,
      };
    }

    acc[key].items.push(v);
    if (!acc[key].marcaColor && v.marcaColor) {
      acc[key].marcaColor = v.marcaColor;
    }
    acc[key].cantidad += 1;
    acc[key].totalVenta += precioVenta;
    acc[key].pagarProveedor += precioCosto;
    acc[key].ganancia = acc[key].totalVenta - acc[key].pagarProveedor;
    return acc;
  }, {});

  const gananciasArray = Object.values(gananciasPorProducto).sort(
    (a, b) => b.ganancia - a.ganancia,
  );
  const totalGeneral = gananciasArray.reduce((acc, g) => acc + g.totalVenta, 0);
  const totalPagarProveedor = gananciasArray.reduce(
    (acc, g) => acc + g.pagarProveedor,
    0,
  );
  const gananciaGeneral = totalGeneral - totalPagarProveedor;
  const getVentaId = (venta) => venta?._id || venta?.id || null;
  const getMarcaVentaClass = (grupo) =>
    grupo.marcaColor ? `venta-marcada venta-marcada-${grupo.marcaColor}` : "";
  const eliminarGrupoVenta = async (grupo) => {
    if (!grupo.items.every((item) => getVentaId(item))) return;
    if (!window.confirm("¿Seguro que querés eliminar esta venta completa?")) {
      return;
    }
    await Promise.all(
      grupo.items.map((item) =>
        eliminarVenta(getVentaId(item), {
          skipConfirm: true,
        }),
      ),
    );
  };

  const marcarGrupoVenta = async (grupo, marcaColor) => {
    if (!isAdmin || !grupo.items.every((item) => getVentaId(item))) return;

    const colorFinal = grupo.marcaColor === marcaColor ? null : marcaColor;
    const ids = grupo.items.map(getVentaId);

    setVentas((prev) =>
      prev.map((venta) =>
        ids.includes(getVentaId(venta))
          ? { ...venta, marcaColor: colorFinal }
          : venta,
      ),
    );

    const marcas = leerMarcasVentas();
    ids.forEach((id) => {
      if (colorFinal) marcas[id] = colorFinal;
      else delete marcas[id];
    });
    guardarMarcasVentas(marcas);

    try {
      await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`${API}/ventas/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            credentials: "include",
            body: JSON.stringify({ marcaColor: colorFinal }),
          });
          if (!res.ok) throw new Error();
        }),
      );
    } catch {
      setError(
        "El color quedó guardado en este navegador, pero la API no permitió guardarlo en el servidor.",
      );
    }
  };

  const renderBotonMarcaGanancia = (grupo, ubicacion) => {
    if (!isAdmin || !grupo.items.every((item) => getVentaId(item))) return null;

    const menuKey = `${ubicacion}-${grupo.key}`;

    return (
      <div className="marca-menu">
        <button
          className="btn sm marca-toggle"
          onClick={() =>
            setMenuMarcaGananciasAbierto((actual) =>
              actual === menuKey ? null : menuKey,
            )
          }
          type="button"
        >
          Marcar
        </button>

        {menuMarcaGananciasAbierto === menuKey && (
          <div className="marca-menu-opciones">
            <button
              className={`btn sm marca-btn marca-verde ${
                grupo.marcaColor === "verde" ? "active" : ""
              }`}
              onClick={() => {
                marcarGrupoVenta(grupo, "verde");
                setMenuMarcaGananciasAbierto(null);
              }}
              type="button"
            >
              Verde
            </button>
            <button
              className={`btn sm marca-btn marca-amarillo ${
                grupo.marcaColor === "amarillo" ? "active" : ""
              }`}
              onClick={() => {
                marcarGrupoVenta(grupo, "amarillo");
                setMenuMarcaGananciasAbierto(null);
              }}
              type="button"
            >
              Amarillo
            </button>
          </div>
        )}
      </div>
    );
  };

  const ventasAgrupadas = Object.values(
    ventasFiltradas.reduce((acc, venta) => {
      const fechaMs = new Date(venta.fecha).getTime();
      const fallbackMinuto = Number.isNaN(fechaMs)
        ? "sin-fecha"
        : Math.floor(fechaMs / 60000);
      const key =
        venta.grupoVentaId ||
        `${venta.usuario || "sin-usuario"}-${venta.metodoPago || "sin-metodo"}-${venta.nombreComprador || "sin-comprador"}-${venta.comentario || "sin-comentario"}-${fallbackMinuto}`;
      if (!acc[key]) {
        acc[key] = {
          key,
          metodoPago: venta.metodoPago,
          nombreComprador: venta.nombreComprador,
          usuario: venta.usuario,
          comentario: venta.comentario,
          fecha: venta.fecha,
          marcaColor: venta.marcaColor || null,
          items: [],
          total: 0,
        };
      }
      acc[key].items.push(venta);
      if (!acc[key].marcaColor && venta.marcaColor) {
        acc[key].marcaColor = venta.marcaColor;
      }
      acc[key].total += Number(venta.producto?.precio) || 0;
      if (
        new Date(venta.fecha).getTime() > new Date(acc[key].fecha).getTime()
      ) {
        acc[key].fecha = venta.fecha;
      }
      return acc;
    }, {}),
  ).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const filtrados = productos.filter((p) => {
    const termino = normalizarTexto(busqueda);
    if (!termino) return true;

    const tokens = termino.split(/\s+/).filter(Boolean);
    const precioNumero = Number(p.precio);
    const precioRaw = Number.isNaN(precioNumero) ? "" : `${precioNumero}`;
    const precioAR = Number.isNaN(precioNumero)
      ? ""
      : precioNumero.toLocaleString("es-AR");
    const searchable = normalizarTexto(
      `${p.nombre || ""} ${p.codigo || ""} ${getProveedorProducto(p)} ${precioRaw} ${precioAR}`,
    );

    return tokens.every((token) => searchable.includes(token));
  });
  const sinStock = (p) => !p.stock || Number(p.stock) <= 0;
  const cantidadEnCarrito = (id) =>
    carrito.find((i) => i.id === id)?.cantidad || 0;

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
            ref={botonCarritoRef}
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
{seccion === "productos" && (
  <TablaProducto
    filtrados={filtrados}
    busqueda={busqueda}
    setBusqueda={setBusqueda}
    abrirModalNuevo={abrirModalNuevo}
    abrirModalEditar={abrirModalEditar}
    eliminarProducto={eliminarProducto}
    cantidadEnCarrito={cantidadEnCarrito}
    productos={productos}
    sinStock={sinStock}
    agregarAlCarrito={agregarAlCarrito}
    quitarDelCarrito={quitarDelCarrito}
    isAdmin={isAdmin}
  />
)}
      {/* ── HISTORIAL ── */}
      {seccion === "historial" && (
        <HistorialVentas
          ventasAgrupadas={ventasAgrupadas}
          getVentaId={getVentaId}
          getProveedorVenta={getProveedorVenta}
          eliminarGrupoVenta={eliminarGrupoVenta}
          marcarGrupoVenta={marcarGrupoVenta}
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
          getCodigoVenta={getCodigoVenta}
        />
      )}

      {/* ── GANANCIAS ── */}
      {seccion === "ganancias" && isAdmin && (
        <>
          <div className="ap-heading" style={{ marginBottom: "0.5rem" }}>
            Ganancias por producto
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
          />{" "}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "1.5rem",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <span>
              Total vendido:{" "}
              <strong style={{ color: "#111", fontSize: "18px" }}>
                {formatPesos(totalGeneral)}
              </strong>
            </span>
            <span>
              A pagar proveedor:{" "}
              <strong style={{ color: "#111", fontSize: "18px" }}>
                {formatPesos(totalPagarProveedor)}
              </strong>
            </span>
            <span>
              Ganancia:{" "}
              <strong style={{ color: GANANCIA_COLOR, fontSize: "18px" }}>
                {formatPesos(gananciaGeneral)}
              </strong>
            </span>
          </div>
          <div className="card-list">
            {gananciasArray.length === 0 && (
              <p className="empty">No hay ventas registradas</p>
            )}
            {gananciasArray.map((g) => (
              <div className={`prod-card ${getMarcaVentaClass(g)}`} key={g.key}>
                <div className="prod-card-top">
                  <div>
                    <div className="prod-card-nombre">{g.nombre}</div>
                    {g.codigo && (
                      <span
                        className="cat"
                        style={{
                          background: "#e0f0ff",
                          color: "#0066cc",
                        }}
                      >
                        #{g.codigo}
                      </span>
                    )}
                  </div>
                  <span className="cat">
                    {g.cantidad} venta{g.cantidad !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="prod-card-autor">{g.proveedor}</div>
                <div className="prod-card-precio">
                  Venta: {formatPesos(g.totalVenta)}
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  A pagar proveedor: {formatPesos(g.pagarProveedor)}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>
                  Ganancia: {formatPesos(g.ganancia)}
                </div>
                <div className="prod-card-actions venta-card-actions">
                  {renderBotonMarcaGanancia(g, "card")}
                </div>
              </div>
            ))}
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Codigo</th>
                  <th>Proveedor</th>
                  <th>Precio costo</th>
                  <th>Ventas</th>
                  <th>Total venta</th>
                  <th>A pagar proveedor</th>
                  <th>Ganancia</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {gananciasArray.length === 0 && (
                  <tr>
                    <td colSpan="9" className="empty">
                      No hay ventas
                    </td>
                  </tr>
                )}
                {gananciasArray.map((g) => (
                  <tr className={getMarcaVentaClass(g)} key={g.key}>
                    <td>{g.nombre}</td>
                    <td>
                      {g.codigo ? (
                        <span
                          className="cat"
                          style={{
                            background: "#e0f0ff",
                            color: "#0066cc",
                          }}
                        >
                          #{g.codigo}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{g.proveedor}</td>
                    <td>{formatPesos(g.precioCosto)}</td>
                    <td>{g.cantidad}</td>
                    <td>
                      <strong>{formatPesos(g.totalVenta)}</strong>
                    </td>
                    <td>
                      <strong>{formatPesos(g.pagarProveedor)}</strong>
                    </td>
                    <td>
                      <strong style={{ color: GANANCIA_COLOR }}>
                        {formatPesos(g.ganancia)}
                      </strong>
                    </td>
                    <td>
                      <div className="venta-row-actions">
                        {renderBotonMarcaGanancia(g, "row")}
                      </div>
                    </td>
                  </tr>
                ))}
                {gananciasArray.length > 0 && (
                  <tr style={{ background: "#f9f9f9" }}>
                    <td>
                      <strong>TOTAL</strong>
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <strong>{ventasFiltradas.length}</strong>
                    </td>
                    <td>
                      <strong>{formatPesos(totalGeneral)}</strong>
                    </td>
                    <td>
                      <strong>{formatPesos(totalPagarProveedor)}</strong>
                    </td>
                    <td>
                      <strong style={{ color: GANANCIA_COLOR }}>
                        {formatPesos(gananciaGeneral)}
                      </strong>
                    </td>
                    <td>-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── MODAL CARRITO ── */}
      {modalCarrito && (
        <ModalCarrito
          carrito={carrito}
          productos={productos}
          totalCarrito={totalCarrito}
          cantidadTotalCarrito={cantidadTotalCarrito}
          metodoPago={metodoPago}
          setMetodoPago={setMetodoPago}
          nombreComprador={nombreComprador}
          setNombreComprador={setNombreComprador}
          comentario={comentario}
          setComentario={setComentario}
          error={error}
          cargando={cargando}
          agregarAlCarrito={agregarAlCarrito}
          quitarDelCarrito={quitarDelCarrito}
          eliminarDelCarrito={eliminarDelCarrito}
          cerrarModalCarrito={cerrarModalCarrito}
          confirmarVenta={confirmarVenta}
        />
      )}

      {/* ── MODAL NUEVO ── */}
      {modalNuevo && (
        <ProductoModal
          titulo="Nuevo producto"
          form={formNuevo}
          setForm={setFormNuevo}
          error={error}
          onCancel={cerrarModalNuevo}
          onGuardar={guardarNuevoProducto}
        />
      )}

      {/* ── MODAL EDITAR ── */}
      {modalEditar && (
        <ProductoModal
          titulo="Editar producto"
          form={formEditar}
          setForm={setFormEditar}
          error={error}
          onCancel={cerrarModalEditar}
          onGuardar={guardarEdicion}
          esEdicion
        />
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
