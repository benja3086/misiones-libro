import "./Contacto.css";

const Contacto = () => {
  return (
    <div className="contacto-container">
<h3>
  Podés escribirnos a:{" "}
  <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZZQQBNcVQJkqhxHqXDPFQBLclVrxgBXZDmHmMXnHnZRtHnbzZPqGdbfTZPGHrXFnNdPTL">misionesidc@gmail.com</a>
</h3>
<h3>
  También podés contactarnos por Instagram:{" "}
  <a
    href="https://www.instagram.com/misionesidc/"
    target="_blank"
    rel="noopener noreferrer"
  >
    @misionesidc
  </a>
</h3>

<br />
<br />
Los horarios de nuestras reuniones son: <br />
<strong>Sábado</strong> de 20:00 a 21:30 <br />
<strong>Domingo</strong> de 10:00 a 11:30 <br />
<br />
Dirección: <br />
<strong>Pasaje Padilla 390</strong>
    </div>
  );
};

export default Contacto;
