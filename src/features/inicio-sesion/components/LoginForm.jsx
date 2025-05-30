import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://formbackend-ndvy.onrender.com/api/encargados/login", {
        usuario,
        contrasena,
      });

      if (response.data.accesso) {
        localStorage.setItem("encargado", JSON.stringify(response.data));
        navigate("/formularioaprendices");
      } else {
        setError(response.data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Iniciar Sesión</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default LoginForm;
