import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useFake3DPlane } from "../hooks/useFake3DPlane";
import GalleryWrapper from "./GalleryWrapper";
import BlurryBackground from "./BlurryBackground";
import Titel from "./Titel";
import { galleryItems } from "../constants";
import Fake3DPlane from "./Fake3DPlane";
import ShowGalleryBtn from "./ShowGalleryBtn";

function AppLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const blurryRef = useRef();
  const previewRef = useRef();

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
        <BlurryBackground blurryRef={blurryRef} imgSrc={item.fake3dImg} />

        <ShowGalleryBtn
          showGallery={showGallery}
          setShowGallery={setShowGallery}
        />

        {/* === COLUMNA IZQUIERDA (TÍTULO) === */}
        <Titel item={item} />

        {/*  (PROJECT PREVIEW COMPONENT) aplicar efectos hover-fake3d con three.js === */}
        <Fake3DPlane
          previewRef={previewRef}
          canvasRef={canvasRef}
          isReady={isReady}
        />
        {/* === GALLERY WRAPPER COMPONENT === */}
        <GalleryWrapper
          galleryItems={galleryItems}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          showGallery={showGallery}
        />
      </div>
    </>
  );
}

export default AppLayout;
