import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  const [photos, setPhotos] = useState([]);
  const [newSession, setNewSession] = useState({
    email: "",
    title: "",
    date: "",
    images: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:3000/photos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setPhotos)
      .catch((err) => console.error("❌ Error al cargar sesiones", err));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewSession((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpload(e) {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    //  Cloudinary
    const formData = new FormData();
    formData.append("title", newSession.title);
    formData.append("date", newSession.date);
    formData.append("owner", newSession.email);

    newSession.images.forEach((file) => {
      formData.append("images", file);
    });

    fetch("http://localhost:3000/photos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((newPhoto) => {
        setPhotos([newPhoto, ...photos]);
        setNewSession({ email: "", title: "", date: "", images: [] });
      })
      .catch((err) => console.error("❌ Error al subir sesión", err));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setNewSession((prev) => ({
      ...prev,
      images: files,
    }));
  }

  function handleDelete(photoId) {
    const token = localStorage.getItem("jwt");

    fetch(`http://localhost:3000/photos/${photoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar sesión");
        }
        setPhotos((prev) => prev.filter((photo) => photo._id !== photoId)); // ✅ actualizar estado
      })
      .catch((err) => console.error("❌ Error al eliminar sesión:", err));
  }

  return (
    <section className="admin">
      <h2 className="admin__title">Panel del Fotógrafo</h2>

      <form className="admin__form" onSubmit={handleUpload}>
        <input
          type="email"
          name="email"
          placeholder="Correo del cliente"
          value={newSession.email}
          onChange={handleChange}
          required
          className="admin__input"
        />
        <input
          type="text"
          name="title"
          placeholder="Título de la sesión"
          value={newSession.title}
          onChange={handleChange}
          required
          className="admin__input"
        />
        <input
          type="date"
          name="date"
          value={newSession.date}
          onChange={handleChange}
          required
          className="admin__input"
        />

        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          required
          className="admin__input"
        />

        <button type="submit" className="admin__upload">
          Subir nueva sesión
        </button>
      </form>

      <ul className="admin__list">
        {photos.map((photo) => (
          <li key={photo._id} className="admin__item">
            <p>
              <strong>Cliente:</strong> {photo.owner}
            </p>
            <p>
              <strong>Fecha:</strong> {photo.date}
            </p>
            <p>
              <strong>Título:</strong> {photo.title}
            </p>
            <p>
              <strong>Fotos:</strong> {photo.images?.length || 0}
            </p>
            <button
              className="admin__delete"
              onClick={() => handleDelete(photo._id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AdminPanel;
