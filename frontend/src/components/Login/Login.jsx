import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { login } from "../../utils/auth";

function Login({ isOpen, onClose, onLogin }) {
  const modalRef = useRef();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(formData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("userEmail", formData.email);
        onLogin({ token: res.token, email: formData.email });
        setFormData({ email: "", password: "" });
        setError("");
        onClose();
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
        <h2 className="modal__title">Iniciar sesión</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
