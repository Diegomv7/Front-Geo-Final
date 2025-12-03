import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${API_URL}/api/users/registro`,
        formData
      );

      localStorage.setItem('token', res.data.token);
      alert('¡Cuenta creada con éxito!');
      navigate('/');
      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.msg || 'Error al registrarse');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Crear Cuenta</h1>
        <p className="register-subtitle">Únete para planear tus viajes</p>

        <form onSubmit={onSubmit}>

          <input 
            type="text"
            name="name"
            placeholder="Tu Nombre"
            onChange={onChange}
            required
            className="register-input"
          />

          <input 
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            onChange={onChange}
            required
            className="register-input"
          />

          <input 
            type="password"
            name="password"
            placeholder="Contraseña"
            minLength="6"
            onChange={onChange}
            className="register-input"
          />

          <button type="submit" className="register-button">
            Registrarme
          </button>
        </form>

        <p className="register-footer">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="register-link">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
