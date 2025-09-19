import React, { useState } from "react";
import axios from "axios";

const BotonPago = ({ titulo, precio, cantidad = 1 }) => {
  const [loading, setLoading] = useState(false);

  const pagar = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/crear-preferencia", {
        title: titulo,
        cantidad,
        precio,
      });

      window.location.href = response.data.init_point;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      alert("Hubo un error al iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={pagar}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {loading ? "Procesando..." : "Pagar con Mercado Pago"}
    </button>
  );
};

export default BotonPago;
