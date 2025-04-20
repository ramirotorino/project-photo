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
    const userEmail = localStorage.getItem("userEmail");

    import("../../utils/cloudinaryApi.js").then(({ getPhotos }) => {
      getPhotos()
        .then((data) => {
          const filteredPhotos = data.filter(
            (photo) => photo.owner === userEmail
          );
          setPhotos(filteredPhotos);
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

    const downloadPromises = photos.map((photo, index) =>
      fetch(photo.image)
        .then((res) => res.blob())
        .then((blob) => {
          const filename = `foto_${index + 1}.jpg`;
          zip.file(filename, blob);
        })
    );

    await Promise.all(downloadPromises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "mi_sesion_de_fotos.zip");
    });
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="client-gallery">
      <div className="client-gallery__top">
        <h2>Mis Fotos</h2>
        <h3>Total de fotos: {photos.length}</h3>

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
              <div key={photo.id} className="client-gallery__card">
                <img src={photo.url} alt={photo.name} />
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
