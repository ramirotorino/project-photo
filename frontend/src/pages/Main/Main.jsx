import "./Main.css";
import { Link } from "react-router-dom";
import Testimonials from "../../components/Testimonials/Testimonials.jsx";
import TrueFocus from "../../../src/components/TrueFocus/TrueFocus.jsx";
import ShinyText from "../../../src/components/ShinyText/ShinyText";
import PixelTransition from "../../../src/components/PixelTransition/PixelTransition.jsx";

function Main() {
  return (
    <main className="main">
      <div className="page">
        <section className="main__hero">
          <div>
            <TrueFocus
              sentence="Franco Riobóo"
              manualMode={false}
              blurAmount={10}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1.5}
            />
            <ShinyText
              text="Sesiones soñadas!"
              disabled={false}
              speed={2}
              className="custom-class"
            />
          </div>
        </section>
        <section className="main__services">
          <h2>Tipos de sesiones</h2>
          <div className="main__cards">
            <div className="main__card">
              iAqui hay texto
              <PixelTransition
                firstContent={
                  <img
                    src="/assets/outsesion.jfif"
                    alt="default pixel transition content, a cat!"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                }
                secondContent={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "#111",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 900,
                        fontSize: "3rem",
                        color: "#ffffff",
                      }}
                    >
                      Momentos únicos e irrepetibles. Capturamos la ternura, la
                      emoción familiar y los detalles más significativos del
                      primer gran evento de tu hijo.
                    </p>
                  </div>
                }
                gridSize={12}
                pixelColor="#ffffff"
                animationStepDuration={0.4}
                className="custom-pixel-card"
              />
              <h3>Bautismos</h3>
              <p>
                Momentos únicos e irrepetibles. Capturamos la ternura, la
                emoción familiar y los detalles más significativos del primer
                gran evento de tu hijo.
              </p>
            </div>
            <div className="main__card">
              <img src="/assets/wedding.jfif" alt="Casamientos" />
              <h3>Casamientos</h3>
              <p>
                Documentamos tu historia de amor desde el "sí" hasta la última
                canción. Cada emoción, mirada y abrazo reflejado en imágenes
                inolvidables.
              </p>
            </div>
            <div className="main__card">
              <img src="/assets/family.jfif" alt="Retratos" />
              <h3>15 anos</h3>
              <p>
                Luces, música y emociones. Retratamos tu fiesta soñada con
                estilo y energía, para que revivas cada instante una y otra vez.
              </p>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Acceso cliente */}
        <section className="main__access">
          <Link to="/login" className="main__cta">
            Acceso Clientes – Ver mis fotos
          </Link>
        </section>

        {/* Contacto */}
        <section className="main__contact">
          <h2>Contacto</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Tu nombre" required />
            <input type="email" placeholder="Tu correo" required />
            <textarea placeholder="Mensaje..." required></textarea>
            <div className="main__actions">
              <button type="submit">Enviar mensaje</button>
              <a
                href="https://wa.me/549XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="main__whatsapp"
              >
                WhatsApp
              </a>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Main;
