const StockBadge = ({ stock }) => {
  const cantidad = Number(stock);

  if (Number.isNaN(cantidad) || cantidad <= 0) {
    return <span className="badge out">Sin stock</span>;
  }

  if (cantidad <= 5) {
    return <span className="badge low">{cantidad} unid.</span>;
  }

  return <span className="badge ok">{cantidad} unid.</span>;
};

export default StockBadge;