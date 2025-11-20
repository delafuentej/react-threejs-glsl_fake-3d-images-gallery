import { useState, useRef, lazy, Suspense } from "react";
import { useFake3DPlane } from "../hooks/useFake3DPlane";
import { useAppAnimations } from "../hooks/animations";
import { galleryItems } from "../constants";
import BlurryBackground from "./BlurryBackground";
import Titel from "./Titel";
import ShowGalleryBtn from "./ShowGalleryBtn";
import Fake3DPlane from "./Fake3DPlane";
//lazy load
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

  // === ANIMACIONES GSAP ===
  useAppAnimations(canvasRef, isReady, activeIndex);

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
          {/* {showGallery && ( */}
          <GalleryWrapper
            galleryItems={galleryItems}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            showGallery={showGallery}
          />
          {/* )} */}
        </Suspense>
      </div>
    </>
  );
}

export default AppLayout;
