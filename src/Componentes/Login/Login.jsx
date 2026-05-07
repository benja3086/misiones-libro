import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [mostrarPassword, setMostrarPassword] = useState(false);
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

          <div className="password-wrapper">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="container">
              <input
                type="checkbox"
                checked={mostrarPassword}
                onChange={() => setMostrarPassword((prev) => !prev)}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="eye"
                width="1em"
                height="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="eye-slash"
                width="1em"
                height="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.477 10.488a3 3 0 004.242 4.243"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.88 5.09A9.953 9.953 0 0112 4.5c4.638 0 8.573 3.007 9.963 7.178a1.05 1.05 0 010 .644 10.05 10.05 0 01-4.043 5.119"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.228 6.228A10.05 10.05 0 002.037 11.68a1.05 1.05 0 000 .644 10.05 10.05 0 005.119 5.119"
                />
              </svg>
            </label>
          </div>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
