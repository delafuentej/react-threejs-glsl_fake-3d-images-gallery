import { galleryItems } from "./constants";
import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useFake3DPlane } from "./hooks/useFake3DPlane";
import GalleryWrapper from "./components/GalleryWrapper";
import ProjectPreview from "./components/ProjectPreview";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const blurryRef = useRef();
  const previewRef = useRef();
  const imgRef = useRef();

  const item = galleryItems[activeIndex];

  const { canvasRef, isReady } = useFake3DPlane(
    galleryItems[activeIndex].fake3dImg,
    galleryItems[activeIndex].depthImg,
    { xDepth: 7, yDepth: 7 }
  );

  // === ANIMACIONES GSAP (FIELES AL ORIGINAL) ===
  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const ctx = gsap.context(() => {
      // Fondo borroso crossfade

      gsap.fromTo(
        ".blurry-img",
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Título y descripción
      gsap.fromTo(
        "h1",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Imagen principal
      gsap.fromTo(
        "h1",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Canvas (imagen 3D)
      gsap.fromTo(
        canvasRef.current,
        { scaleX: 0, scaleY: 0, y: 80, opacity: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        "h1",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Canvas (imagen 3D)
      gsap.fromTo(
        canvasRef.current,
        { scaleX: 0, scaleY: 0, y: 80, opacity: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, [activeIndex, isReady]);

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

        {/*  (PROJECT PREVIEW COMPONENT) aplicar efectos hover-fake3d con three.js === */}
        <ProjectPreview
          previewRef={previewRef}
          canvasRef={canvasRef}
          isReady={isReady}
        />
        {/* === GALLERY WRAPPER COMPONENT === */}
        <GalleryWrapper
          galleryItems={galleryItems}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </>
  );
}

export default App;
