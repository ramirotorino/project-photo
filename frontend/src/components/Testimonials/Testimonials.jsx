import { useState, useEffect } from "react";
import "./Testimonials.css";

const testimonialsData = [
  {
    name: "Samuel Baker",
    message:
      "I was amazed by the professionalism and skill of Franco Rioboo. From the initial meeting to the final delivery, they guided me through every step of the photography process. The finished photos surpassed all my expectations and have beautifully preserved my memories.",
  },
  {
    name: "Laura Pérez",
    message:
      "Una experiencia increíble. Las fotos fueron entregadas a tiempo y el trato fue muy profesional. Volvería a contratar sin dudarlo.",
  },
  {
    name: "Daniel Kim",
    message:
      "The lighting, the editing, everything was spot on. Highly recommended service!",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialsData.length);
    }, 7000); // cambia cada 7 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials">
      <video className="testimonials__video" autoPlay muted loop playsInline>
        <source src="/assets/vector3.webm" type="video/webm" />
      </video>
      <div className="page">
        <div className="testimonials__card">
          <div className="testimonials__quote">“</div>
          <h3 className="testimonials__name">
            {testimonialsData[current].name}
          </h3>
          <p className="testimonials__text">
            {testimonialsData[current].message}
          </p>
          <div className="testimonials__dots">
            {testimonialsData.map((_, index) => (
              <span
                key={index}
                className={`testimonials__dot ${
                  index === current ? "active" : ""
                }`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
