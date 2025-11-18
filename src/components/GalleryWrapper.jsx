import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const GalleryWrapper = ({
  galleryItems,
  activeIndex,
  setActiveIndex,
  showGallery,
}) => {
  const wrapperRef = useRef();

  useGSAP(() => {
    if (!wrapperRef.current) return;

    if (showGallery) {
      // ANIMACIÓN DE ENTRADA
      gsap.fromTo(
        wrapperRef.current,
        { y: 80, opacity: 0, display: "none" },
        {
          y: 0,
          opacity: 1,
          display: "block",
          duration: 0.7,
          ease: "power3.out",
        }
      );
    } else {
      // ANIMACIÓN DE SALIDA
      gsap.to(wrapperRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => {
          if (wrapperRef.current) wrapperRef.current.style.display = "none";
        },
      });
    }
  }, [showGallery]);
  return (
    <div className="gallery-wrapper" ref={wrapperRef}>
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
  );
};

export default GalleryWrapper;
