import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // importa el css

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Exitoso");
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.msg || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      {/* COLUMNA IZQUIERDA */}
      <div className="login-left">
        <h1 className="login-title">Iniciar Sesión</h1>
        <h3 className="login-subtitle">Accede a tus proximos destinos</h3>

        <form onSubmit={onSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu correo"
            value={formData.email}
            onChange={onChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={onChange}
            required
          />

          <button type="submit" className="login-btn">Entrar</button>
        </form>

        <p className="login-register">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="login-right">
        <img
          src="https://images.unsplash.com/photo-1604928141064-207cea6f571f?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login visual"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default Login;
