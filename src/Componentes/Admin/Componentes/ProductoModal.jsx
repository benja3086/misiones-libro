const getValue = (form, campo, esEdicion = false) => {
  if (campo === "imagen") {
    return typeof form.imagen === "string" ? form.imagen : "";
  }

  if (esEdicion) {
    return form[campo] || "";
  }

  return form[campo];
};

const ProductoModal = ({
  titulo,
  form,
  setForm,
  error,
  onCancel,
  onGuardar,
  esEdicion = false,
}) => {
  const updateField = (campo) => (e) => {
    setForm((actual) => ({ ...actual, [campo]: e.target.value }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h3>{titulo}</h3>
        <div className="field">
          <label>Codigo</label>
          <input
            value={getValue(form, "codigo", esEdicion)}
            onChange={updateField("codigo")}
            placeholder="Ej: A, B, AC..."
          />
        </div>
        <div className="field">
          <label>Nombre</label>
          <input
            value={getValue(form, "nombre", esEdicion)}
            onChange={updateField("nombre")}
          />
        </div>
        <div className="grid2">
          <div className="field">
            <label>Precio venta ($)</label>
            <input
              type="number"
              value={getValue(form, "precio", esEdicion)}
              onChange={updateField("precio")}
            />
          </div>
          <div className="field">
            <label>Precio costo ($)</label>
            <input
              type="number"
              value={getValue(form, "precioCosto", esEdicion)}
              onChange={updateField("precioCosto")}
            />
          </div>
        </div>
        <div className="grid2">
          <div className="field">
            <label>Stock</label>
            <input
              type="number"
              value={getValue(form, "stock", esEdicion)}
              onChange={updateField("stock")}
            />
          </div>
          <div className="field">
            <label>Provedor</label>
            <input
              value={getValue(form, "provedor", esEdicion)}
              onChange={updateField("provedor")}
            />
          </div>
        </div>
        <div className="field">
          <label>Descripcion</label>
          <input
            value={getValue(form, "descripcion", esEdicion)}
            onChange={updateField("descripcion")}
          />
        </div>
        <div className="field">
          <label>URL de imagen</label>
          <input
            value={getValue(form, "imagen", esEdicion)}
            onChange={updateField("imagen")}
            placeholder="https://..."
          />
        </div>
        {error && <p className="err">{error}</p>}
        <div className="modal-foot">
          <button className="btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn primary" onClick={onGuardar}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoModal;
