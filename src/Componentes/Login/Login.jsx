import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(username, password); // ← solo esto, el contexto hace todo
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Iniciar sesión</h2>
        <p className="login-sub">Ingresá tus credenciales para continuar</p>

        <div className="login-field">
          <label>Usuario</label>
          <input
            type="text"
            placeholder="Tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;