import "./ClientGallery.css";
import { useEffect, useState } from "react";

import JSZip from "jszip";
import { saveAs } from "file-saver";

function ClientGallery() {
  const [photos, setPhotos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // ✅ Para botón "Mostrar más"
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    import("../../utils/cloudinaryApi.js").then(({ getPhotos }) => {
      getPhotos()
        .then((data) => {
          console.log("📸 Fotos recibidas del backend:", data);
          setPhotos(data); // ✅ ya vienen filtradas por el backend
        })
        .catch((err) => {
          setError("Lo sentimos, hubo un error al cargar las fotos.");
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    });
  }, []);

  async function handleDownloadAll() {
    const zip = new JSZip();

    const downloadPromises = [];

    photos.forEach((photo, index) => {
      photo.images?.forEach((url, i) => {
        const filename = `sesion${index + 1}_foto${i + 1}.jpg`;
        downloadPromises.push(
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              zip.file(filename, blob);
            })
        );
      });
    });

    await Promise.all(downloadPromises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "mis_fotos.zip");
    });
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  console.log("🖼 Fotos que se van a renderizar:", photos);

  return (
    <section className="client-gallery">
      <div className="client-gallery__top">
        <h2>Total de fotos: {photos.length}</h2>

        {photos.map((photo, index) => (
          <div key={index}>
            <p>{photo.title}</p>
            <p>{photo.date}</p>
            <p> {photo.images?.length}</p>
          </div>
        ))}

        <button
          className="client-gallery__download"
          onClick={handleDownloadAll}
        >
          Descargar todas
        </button>
      </div>

      {isLoading && <p>Cargando fotos...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="client-gallery__grid">
            {photos.slice(0, visibleCount).map((photo) => (
              <div key={photo._id} className="client-gallery__card">
                <img
                  src={photo.images?.[0]} // ✅ usamos la primera imagen de la sesión
                  alt={photo.title || "Foto"}
                  onError={(e) => (e.target.style.display = "none")}
                />
                <p className="client-gallery__title">
                  {photo.title || "Sesión sin título"}
                </p>
              </div>
            ))}
          </div>

          {visibleCount < photos.length && (
            <button onClick={handleShowMore}>Mostrar más</button>
          )}
        </>
      )}
    </section>
  );
}

export default ClientGallery;
