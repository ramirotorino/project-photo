import React, { useState, useRef, useEffect } from "react";
import "./Register.css";
import { register } from "../../utils/auth";

function Register({ isOpen, onClose, onSuccess }) {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Manejar clic afuera y Escape
  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Manejo del formulario
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(formData)
      .then(() => {
        setFormData({ name: "", email: "", password: "" });
        setError("");
        onClose();
        onSuccess("¡Registro exitoso!\n Ahora podés iniciar sesión.");
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="tooltip" ref={modalRef}>
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">Crear cuenta</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="modal__input"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="modal__input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="modal__input"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <span className="modal__error">{error}</span>}
          <button type="submit" className="modal__submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
