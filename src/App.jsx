import { galleryItems } from "./constants";
import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const blurryRef = useRef();
  const previewRef = useRef();
  const imgRef = useRef();

  const item = galleryItems[activeIndex];

  // === ANIMACIONES GSAP (FIELES AL ORIGINAL) ===
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fondo borroso crossfade

      gsap.fromTo(
        ".blurry-img",
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Título y descripción
      gsap.fromTo(
        ".project-details h1",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Imagen principal
      gsap.fromTo(
        ".project-img",
        { scale: 0, y: 80, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".project-img img",
        { scale: 2 },
        { scale: 1, duration: 1, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <>
      <div className="container">
        {/*  === FONDO BORROSO (MISMA ESTRUCTURA) === */}
        <div className="blurry-prev" ref={blurryRef}>
          <img src={item.fake3dImg} className="blurry-img" alt="" />
          <div className="overlay"></div>
        </div>

        {/* === COLUMNA IZQUIERDA (TÍTULO + TEXTO) === */}
        <div className="site-info">
          <h1 className="title">{item.title}</h1>
        </div>

        {/*  (IMAGEN PRINCIPAL) aplicar efectos hover-fake3d con three.js === */}
        <div className="project-preview" ref={previewRef}>
          <div className="project-img" ref={imgRef}>
            <img src={item.fake3dImg} alt={item.title} />
          </div>
        </div>

        {/* === GALERÍA (MISMA POSICIÓN Y DISEÑO) === */}
        <div className="gallery-wrapper">
          <div className="gallery">
            {galleryItems.map((g, i) => (
              <div
                key={i}
                className={`item ${i === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <img src={g.fake3dImg} alt={g.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
