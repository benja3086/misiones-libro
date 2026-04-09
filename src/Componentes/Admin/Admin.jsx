import { useState, useEffect } from "react";
import "./Admin.css";

const API = import.meta.env.VITE_API_URL;

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre:"", precio:"", stock:"", categoria:"libros", autor:"", descripcion:"", imagen:"" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/productos`, { credentials: "include" })
      .then(res => res.json())
      .then(setProductos)
      .catch(() => setError("Error al cargar productos"));
  }, []);

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ nombre:"", precio:"", stock:"", categoria:"libros", autor:"", descripcion:"", imagen:"" });
    setModal(true);
  };

  const abrirEditar = (p) => { setEditando(p.id); setForm({...p}); setModal(true); };
  const cerrar = () => { setModal(false); setError(""); };

  const guardar = async () => {
    if (!form.nombre || form.precio === "" || form.stock === "")
      return setError("Completá nombre, precio y stock.");
    const datos = { ...form, precio: Number(form.precio), stock: Number(form.stock) };
    try {
      if (editando) {
        await fetch(`${API}/productos/${editando}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(datos),
        });
        setProductos(prev => prev.map(p => p.id === editando ? { ...p, ...datos } : p));
      } else {
        const res = await fetch(`${API}/productos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(datos),
        });
        const nuevo = await res.json();
        setProductos(prev => [...prev, nuevo]);
      }
      cerrar();
    } catch {
      setError("Error al guardar el producto");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await fetch(`${API}/productos/${id}`, { method: "DELETE", credentials: "include" });
      setProductos(prev => prev.filter(p => p.id !== id));
    } catch {
      setError("Error al eliminar");
    }
  };

  const StockBadge = ({ stock }) => (
    <span className={`badge ${stock === 0 ? "out" : stock <= 5 ? "low" : "ok"}`}>
      {stock === 0 ? "Sin stock" : `${stock} unid.`}
    </span>
  );

  return (
    <div className="ap">
      <div className="ap-top">
        <div>
          <div className="ap-heading">Productos</div>
          <div className="ap-sub">{filtrados.length} producto{filtrados.length !== 1 ? "s" : ""}</div>
        </div>
        <button className="btn primary" onClick={abrirNuevo}>+ Nuevo producto</button>
      </div>

      <div className="ap-search">
        <input
          placeholder="Buscar por nombre o categoría..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* CARDS — solo mobile */}
      <div className="card-list">
        {filtrados.length === 0 && (
          <p className="empty">No hay productos</p>
        )}
        {filtrados.map(p => (
          <div className="prod-card" key={p.id}>
            <div className="prod-card-top">
              <div>
                <div className="prod-card-nombre">{p.nombre}</div>
                <div className="prod-card-autor">{p.autor}</div>
              </div>
              <span className="cat">{p.categoria}</span>
            </div>
            <div className="prod-card-body">
              <span className="prod-card-precio">
                ${Number(p.precio).toLocaleString("es-AR")}
              </span>
              <StockBadge stock={p.stock} />
            </div>
            <div className="prod-card-actions">
              <button className="btn sm" onClick={() => abrirEditar(p)}>Editar</button>
              <button className="btn sm danger" onClick={() => eliminar(p.id)}>Borrar</button>
            </div>
          </div>
        ))}
      </div>

      {/* TABLA — solo desktop */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width:"28%" }}>Nombre</th>
              <th style={{ width:"14%" }}>Categoría</th>
              <th style={{ width:"13%" }}>Precio</th>
              <th style={{ width:"13%" }}>Stock</th>
              <th style={{ width:"18%" }}>Autor</th>
              <th style={{ width:"14%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 && (
              <tr><td colSpan="6" className="empty">No hay productos</td></tr>
            )}
            {filtrados.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td><span className="cat">{p.categoria}</span></td>
                <td>${Number(p.precio).toLocaleString("es-AR")}</td>
                <td><StockBadge stock={p.stock} /></td>
                <td>{p.autor}</td>
                <td>
                  <div className="td-actions">
                    <button className="btn sm" onClick={() => abrirEditar(p)}>Editar</button>
                    <button className="btn sm danger" onClick={() => eliminar(p.id)}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="overlay">
          <div className="modal">
            <h3>{editando ? "Editar producto" : "Nuevo producto"}</h3>
            <div className="field"><label>Nombre</label>
              <input value={form.nombre} onChange={e => setForm(f=>({...f,nombre:e.target.value}))} placeholder="Título del producto" />
            </div>
            <div className="grid2">
              <div className="field"><label>Precio ($)</label>
                <input type="number" value={form.precio} onChange={e => setForm(f=>({...f,precio:e.target.value}))} placeholder="0" />
              </div>
              <div className="field"><label>Stock</label>
                <input type="number" value={form.stock} onChange={e => setForm(f=>({...f,stock:e.target.value}))} placeholder="0" />
              </div>
            </div>
            <div className="grid2">
              <div className="field"><label>Categoría</label>
                <select value={form.categoria} onChange={e => setForm(f=>({...f,categoria:e.target.value}))}>
                  <option value="libros">Libros</option>
                  <option value="remeras">Remeras</option>
                  <option value="utiles">Útiles</option>
                </select>
              </div>
              <div className="field"><label>Autor</label>
                <input value={form.autor} onChange={e => setForm(f=>({...f,autor:e.target.value}))} placeholder="Nombre del autor" />
              </div>
            </div>
            <div className="field"><label>Descripción</label>
              <input value={form.descripcion} onChange={e => setForm(f=>({...f,descripcion:e.target.value}))} placeholder="Descripción breve" />
            </div>
            <div className="field"><label>URL de imagen</label>
              <input value={form.imagen} onChange={e => setForm(f=>({...f,imagen:e.target.value}))} placeholder="https://..." />
            </div>
            {error && <p className="err">{error}</p>}
            <div className="modal-foot">
              <button className="btn" onClick={cerrar}>Cancelar</button>
              <button className="btn primary" onClick={guardar}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;