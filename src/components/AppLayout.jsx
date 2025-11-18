import { useState, useRef, lazy, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useFake3DPlane } from "../hooks/useFake3DPlane";
import BlurryBackground from "./BlurryBackground";
import Titel from "./Titel";
import { galleryItems } from "../constants";

import ShowGalleryBtn from "./ShowGalleryBtn";

const Fake3DPlane = lazy(() => import("./Fake3DPlane"));
const GalleryWrapper = lazy(() => import("./GalleryWrapper"));

function AppLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const blurryRef = useRef();
  const previewRef = useRef();

  const item = galleryItems[activeIndex];

  const { canvasRef, isReady } = useFake3DPlane(item.fake3dImg, item.depthImg, {
    xDepth: 7,
    yDepth: 7,
  });

  // === ANIMACIONES GSAP (FIELES AL ORIGINAL) ===
  useGSAP(() => {
    if (!canvasRef.current || !isReady) return;

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

        {/* </Suspense> */}
        {/* === GALLERY WRAPPER COMPONENT === */}
        <Suspense fallback={null}>
          <GalleryWrapper
            galleryItems={galleryItems}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            showGallery={showGallery}
          />
        </Suspense>
      </div>
    </>
  );
}

export default AppLayout;
