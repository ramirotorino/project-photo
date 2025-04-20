import "./GalleryPublic.css";

function GalleryPublic() {
  const categories = [
    {
      title: "Fotografía de bodas",
      image: "/assets/wedding.jpg",
      description:
        "Cobertura completa de tu boda: ceremonia, fiesta y retratos personalizados.",
    },
    {
      title: "Sesiones al aire libre",
      image: "/assets/outdoor.jpg",
      description:
        "Sesiones naturales en parques, campos, playas o donde elijas.",
    },
    {
      title: "Retratos artísticos",
      image: "/assets/portrait.jpg",
      description:
        "Capturamos tu esencia con iluminación y escenarios pensados para vos.",
    },
    {
      title: "Eventos sociales",
      image: "/assets/events.jpg",
      description: "Cubrimos cumpleaños, aniversarios, comuniones y más.",
    },
  ];

  return (
    <section className="gallery-page">
      {/* Botón para volver */}
      <div className="gallery-page__top">
        <a href="/" className="gallery-page__back">
          ← Volver al inicio
        </a>
      </div>

      {/* Carrusel portada */}
      <div className="gallery-page__hero">
        <div className="gallery-page__reel">
          <img src="/assets/1.jpg" alt="Foto destacada 1" />
          <img src="/assets/2.jpg" alt="Foto destacada 2" />
          <img src="/assets/3.jpg" alt="Foto destacada 3" />
        </div>
        <h1 className="gallery-page__title">Explorá mis trabajos</h1>
      </div>

      {/* Sección de categorías */}
      <div className="gallery-page__section">
        <h2>Servicios fotográficos</h2>
        <div className="gallery-page__grid">
          {categories.map((cat, i) => (
            <div
              className="gallery-page__card"
              key={i}
              onClick={() => alert(cat.description)}
            >
              <img src={cat.image} alt={cat.title} />
              <h3>{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de contacto */}
      <div className="gallery-page__contact">
        <h2>Contacto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Tu nombre" required />
          <input type="email" placeholder="Tu correo" required />
          <textarea placeholder="Mensaje..." required></textarea>
          <div className="gallery-page__actions">
            <button type="submit">Enviar mensaje</button>
            <a
              href="https://wa.me/549XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              WhatsApp
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default GalleryPublic;
